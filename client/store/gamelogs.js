import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GAMELOGS = 'GET_GAMELOGS'

/**
 * INITIAL STATE
 */
const intialState = [];

/**
 * ACTION CREATORS
 */
const getGamelogs = gamelogs => ({type: GET_GAMELOGS, gamelogs})


/**
 * THUNK CREATORS
 */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err))

export const getGamelogsThunk = (name, league, year) => {
  return dispatch =>
    axios.get(`/api/sportsData?name=${name}&league=${league}&year=${year}`)
      .then(result => {
        const gamelogs = result.data.playergamelogs.gamelogs;
        const position = gamelogs[0].player.Position;
        dispatch(getGamelogs(gamelogs));
        history.push(`/player/${position}`);
      })
      .catch(console.error.bind(console));
}

/**
 * REDUCER
 */
export default function (state = intialState, action) {
  switch (action.type) {
    case GET_GAMELOGS:
      return action.gamelogs
    default:
      return state
  }
}
