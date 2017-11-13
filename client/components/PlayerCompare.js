import {connect} from 'react-redux';
// import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';
import { CompareHeader } from '../components'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryLegend } from 'victory';
import positionalStats from '../../filterStatCategory';

const PlayerCompare = (props) => {

  const { compare, match } = props;
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

  let plotData1 = [];
  let plotData2 = [];

  compare.length && compare.forEach((gamelogs, playerIdx) => {
    if (gamelogs.length) {
      positionalStats(gamelogs, '@category', categories);

      gamelogs.forEach((match, index) => {
        match.keyStats.length && match.keyStats.forEach(stat => {
          if (stat['@abbreviation'] === selectedStat && playerIdx === 0) {
            plotData1.push({ x: index + 1, y: +stat['#text'] })
          }
          else if (stat['@abbreviation'] === selectedStat && playerIdx === 1) {
            plotData2.push({ x: index + 1, y: +stat['#text'] })
          }
        })
      })
    }
  })
  // console.log(plotData1);
  // console.log(plotData2);
  const playerA = compare[0][0].player;
  const playerB = compare[1][0].player;
  const nameA = `${playerA.FirstName} ${playerA.LastName}`;
  const nameB = `${playerB.FirstName} ${playerB.LastName}`

  return (
    <div>
      <CompareHeader />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLegend //x={175} y={150}
          //title="Legend"
          //centerTitle
          //orientation="vertical"
          //gutter={20}
          style={{ labels: {fontSize: 10 } }}
          // border: { stroke: "black" },
          data={[
            { name: nameA, symbol: { fill: "red" } },
            { name: nameB, symbol: { fill: "blue" } }
          ]}
        />
        <VictoryAxis
          label="Games"
          tickCount={Math.max(plotData1.length, plotData2.length)}
          //{console.log({tickCount})}
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
          data={ plotData1 }
          // domain={{x: [1, 16], y: [0, 600]}}
        />
        <VictoryLine
        interpolation="natural"
        style={{
          data: { stroke: "blue" },
          parent: { border: "1px solid #ccc"}
        }}
        data={ plotData2 }
        // domain={{x: [1, 16], y: [0, 600]}}
      />
      </VictoryChart>
    </div>
  )
}

const mapStateToProps = (state) => ({
  //gamelogs: state.gamelogs,
  compare: state.compare
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

export default connect(mapStateToProps)(PlayerCompare);


// if (!selectedStat) {
//   compare.length && compare[0][0]
// }
