import React from 'react'
import {connect} from 'react-redux'
//import {withRouter, Link} from 'react-router-dom'
import {compareGamelogsThunk} from '../store'


const CompareForm = (props) => {

  const leagues = ['NFL', 'NHL', 'NBA', 'MLB'];
  const regPlay = ['Regular', 'Playoff'];
  const years = [
    '2007-2008',
    '2008-2009',
    '2009-2010',
    '2010-2011',
    '2011-2012',
    '2012-2013',
    '2013-2014',
    '2014-2015',
    '2015-2016',
    '2016-2017'
  ];

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} name='comparePlayers'>
      <h3>Compare Players</h3>
      <div>
        <label htmlFor="name1"><small>Player One</small></label>
        <input name="name1" type="text" />
      </div>
      <div>
      <label htmlFor="name2"><small>Player Two</small></label>
      <input name="name2" type="text" />
    </div>
      <div>
        <label htmlFor="league"><small>League</small></label>
        <select name="league" type="text" defaultValue="nfl">
          { leagues.map( league => <option key={league} value={league}>{league.toUpperCase()}</option> )}
        </select>
      </div>
      <div>
        <label htmlFor="year"><small>Year</small></label>
        <select name="year" type="text" defaultValue="2016-2017">
          { years.map(year => <option key={year} value={year}>{year}</option> )}
        </select>
      </div>
      <div>
        <label htmlFor="yearType"><small>Type</small></label>
        <select name="yearType" type="text" defaultValue="regular">
          { regPlay.map(type => <option key={type} value={type}>{type}</option> )}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit (event) {
    event.preventDefault();
    const name1 = event.target.name1.value;
    const name2 = event.target.name2.value;
    const league = event.target.league.value.toLowerCase();
    const type = event.target.yearType.value.toLowerCase();
    let year = event.target.year.value
    if (type === 'playoff') { year = year.slice(-4); }
    const formYear = `${year}-${type}`;
    dispatch(compareGamelogsThunk(name1, name2, league, formYear))
  }
})

// const mapStateToProps = (state) => ({
//   player: state.gamelogs
// })

export default connect(null, mapDispatchToProps)(CompareForm);
