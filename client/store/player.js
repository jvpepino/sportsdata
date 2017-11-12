import axios from 'axios'
import history from '../history'

// const auth = require('../../secrets')
// const MySportsFeeds = require('mysportsfeeds-node')
// const msf = new MySportsFeeds('1.0', true, null);
// msf.authenticate(auth.username, auth.password);


/**
 * ACTION TYPES
 */
const GET_PLAYER = 'GET_PLAYER'


/**
 * INITIAL STATE
 */
//const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getPlayer = player => ({type: GET_PLAYER, player})


/**
 * THUNK CREATORS
 */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err))

export const getPlayerThunk = (name, league, year) => {
  return dispatch =>
    axios.get(`/api/sportsData?name=${name}&league=${league}&year=${year}`)
      .then(result => {
        const gamelogs = result.data.playergamelogs.gamelogs;
        const position = gamelogs[0].player.Position;
        dispatch(getPlayer(gamelogs));
        history.push(`/player/${position}`);
      })
      .catch(console.error.bind(console));
}
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.player
    default:
      return state
  }
}
