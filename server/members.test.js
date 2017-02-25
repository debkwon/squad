const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Member = require('APP/db/models/member')
const app = require('./start')

describe('/api/members', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/members/1`)
        .expect(401)
    )

    it('POST creates a member', () =>
      request(app)
        .post('/api/members')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    )

    it('POST redirects to the member it just made', () =>
      request(app)
        .post('/api/members')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        }))
    )
  })
})
