import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_GAMELOGS = 'ADD_GAMELOGS'

/**
 * INITIAL STATE
 */
//const intialState = {}

/**
 * ACTION CREATORS
 */
const addGamelogs = gamelogs => ({type: ADD_GAMELOGS, gamelogs})

/**
 * THUNK CREATORS
 */

export const compareGamelogsThunk = (name1, name2, league, year) => {
  return dispatch => {
    const playerOne = axios.get(`/api/sportsData?name=${name1}&league=${league}&year=${year}`);
    const playerTwo = axios.get(`/api/sportsData?name=${name2}&league=${league}&year=${year}`);
    return Promise.all([playerOne, playerTwo])
      .then(([resultOne, resultTwo]) => {
        // console.log('RES1', resultOne);
        // console.log('RES2', resultTwo);
        const gamelogs1 = resultOne.data.playergamelogs.gamelogs;
        const gamelogs2 = resultTwo.data.playergamelogs.gamelogs;
        dispatch(addGamelogs(gamelogs1));
        dispatch(addGamelogs(gamelogs2));
        const position = gamelogs1[0].player.Position;
        history.push(`/compare/${position}`);
      })
      .catch(console.error.bind(console));
  }
}


    // axios.get(`/api/sportsData?name=${name1}&league=${league}&year=${year}`)
    //   .then(result => {
    //     const gamelogs1 = result.data.playergamelogs.gamelogs;
    //     //const position1 = gamelogs1[0].player.Position;
    //     dispatch(addGamelogs(gamelogs1));
    //   })
    //   .then( () =>
    //   axios.get(`/api/sportsData?name=${name2}&league=${league}&year=${year}`))
    //     .then(result => {
    //       const gamelogs2 = result.data.playergamelogs.gamelogs;
    //       const position2 = gamelogs2[0].player.Position;
    //       dispatch(addGamelogs(gamelogs2));
    //       history.push(`/compare/${position2}`);
    //     })
    //     .catch(console.error.bind(console));
    // }
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_GAMELOGS:
      return [...state, action.gamelogs]
    default:
      return state
  }
}
