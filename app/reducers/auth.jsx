import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.member
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = member => ({
  type: AUTHENTICATED, member
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const member = response.data
        dispatch(authenticated(member))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
