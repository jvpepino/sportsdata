import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';
import positionalStats from '../../filterStatCategory';

const CompareHeader = (props) => {
  const { compare } = props;

  //NFL Position to Category
  const positionToCategories = {
    QB: ['Passing'],
    WR: ['Receiving'],
    TE: ['Receiving'],
    RB: ['Rushing', 'Receiving'],
  };

  const handleSubmit = (event, selectedPosition) => {
    event.preventDefault();
    let statCat = event.target.category.value;
    if (statCat.slice(-1) === '%') {
      statCat = statCat.slice(0, -1) + '_Pct';
    }
    props.history.push(`/compare/${selectedPosition}/${statCat}`)
  }

  if (compare.length) {
    const playerDetailsA = compare[0][0].player;
    const teamDetailsA = compare[0][0].team;
    const FirstNameA = playerDetailsA.FirstName;
    const LastNameA = playerDetailsA.LastName;
    const JerseyNumberA = playerDetailsA.JerseyNumber;
    const PositionA = playerDetailsA.Position;
    const NameA = teamDetailsA.Name;
    const CityA = teamDetailsA.City;

    const playerDetailsB = compare[1][0].player;
    const teamDetailsB = compare[1][0].team;
    const FirstNameB = playerDetailsB.FirstName;
    const LastNameB = playerDetailsB.LastName;
    const JerseyNumberB = playerDetailsB.JerseyNumber;
    const PositionB = playerDetailsB.Position;
    const NameB = teamDetailsB.Name;
    const CityB = teamDetailsB.City;

    const categories = positionToCategories[PositionA];

    compare.forEach(gamelogs => {
      if (gamelogs.length) {
        positionalStats(gamelogs, '@category', categories)
      }
    })

    return (
      <div>
        <h3>{`${CityA} ${NameA} - #${JerseyNumberA} ${PositionA}`}</h3>
        <h2>{`${FirstNameA} ${LastNameA}`}</h2>
        <hr />
        <h3>{`${CityB} ${NameB} - #${JerseyNumberB} ${PositionB}`}</h3>
        <h2>{`${FirstNameB} ${LastNameB}`}</h2>
        <hr />
        <form onSubmit={(event) => handleSubmit(event, PositionA)} name='playerCompare'>
          <label htmlFor="category"><small>Select Comparison Stat</small></label>
          <select name="category" type="text">
            { !!compare[0][0] && compare[0][0].keyStats.map(stat =>
              (<option key={stat['@abbreviation']} value={stat['@abbreviation']}>
                {stat['@abbreviation']}
              </option>)
            )}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
  else {
    return <div />
  }
}

const mapStateToProps = (state) => ({
  compare: state.compare
})

export default withRouter(connect(mapStateToProps)(CompareHeader));

// <form onSubmit={(event) => this.handleSubmit(event, selectedPosition)} name='playerChart'>
// <label htmlFor="category"><small>Stat</small></label>
// <select name="category" type="text">
//   { !!gamelogs[0] && gamelogs[0].keyStats.map(stat =>
//     (<option key={stat['@abbreviation']} value={stat['@abbreviation']}>
//       {stat['@abbreviation']}
//     </option>)
//   )}
// </select>
// <button type="submit">Submit</button>
// </form>
