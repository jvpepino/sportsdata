import {connect} from 'react-redux';
// import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from 'victory';
import { PlayerHeader } from '../components'
import positionalStats from '../../filterStatCategory';

const PlayerChart = (props) => {

  const { gamelogs, match } = props;
  const selectedPosition = match.params.position;
  let selectedStat = match.params.statCat;
  if (selectedStat.slice(-4) === '_Pct') {
    selectedStat = selectedStat.slice(0, -4) + '%';
  }

  //NFL Position to Category
  const positionToCategories = {
    QB: ['Passing'],
    WR: ['Receiving'],
    TE: ['Receiving'],
    RB: ['Rushing', 'Receiving'],
  };

  const categories = positionToCategories[selectedPosition];

  gamelogs.length && positionalStats(gamelogs, '@category', categories);

  let plotData = [];
  gamelogs.length && gamelogs.forEach((match, index) => {
    match.keyStats.length && match.keyStats.map(stat => {
      if (stat['@abbreviation'] === selectedStat) {
        plotData.push({ x: index + 1, y: +stat['#text'] })
      }
    })
  })
  // console.log(plotData);

  return (
    <div>
      <PlayerHeader />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          label="Games"
          tickCount={plotData.length}
          style={{
            //axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 10, padding: 20},
            //grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: 5, padding: 5}
          }}
        />
        <VictoryAxis
          dependentAxis
          label={selectedStat}
          style={{
            //axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 10, padding: 20},
            //grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: 5, padding: 5}
          }}
        />

        <VictoryLine
          interpolation="natural"
          style={{
            data: { stroke: "red" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ plotData }
          // domain={{x: [1, 16], y: [0, 600]}}
        />
      </VictoryChart>
    </div>
  )
}

const mapStateToProps = (state) => ({
  gamelogs: state.gamelogs,

})

// const mapDispatchToProps = (dispatch) => ({
//   handleSubmit (event) {
//     event.preventDefault();
//     const name = event.target.name.value;
//     const league = event.target.league.value;
//     const year = event.target.year.value;

//     dispatch(getPlayerThunk(name, league, year))
//   }
// })

export default connect(mapStateToProps)(PlayerChart);
