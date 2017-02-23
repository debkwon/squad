const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const Member = require('APP/db/models/member')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()


/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/facebook`,
  },
  passport
})

// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').Strategy,
  config: {
    consumerKey: env.GOOGLE_CONSUMER_KEY,
    consumerSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/google`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecrets: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport
})

// Other passport configuration:

passport.serializeUser((member, done) => {
  done(null, member.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize member.id=%d', id)
    Member.findById(id)
      .then(member => {
        debug('deserialize did ok member.id=%d', member.id)
        done(null, member)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate member(email: "%s")', email)
    Member.findOne({where: {email}})
      .then(member => {
        if (!member) {
          debug('authenticate member(email: "%s") did fail: no such member', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return member.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate member(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate member(email: "%s") did ok: member.id=%d', member.id)
            done(null, member)
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', (req, res) => res.send(req.member))

auth.post('/login/:strategy', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next)
)

auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth

