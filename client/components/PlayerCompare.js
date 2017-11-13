import {connect} from 'react-redux';
// import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';
import { CompareHeader } from '../components'
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import positionalStats from '../../filterStatCategory';

const PlayerCompare = (props) => {

  const { compare, match } = props;
  const selectedPosition = match.params.position;
  const selectedStat = match.params.statCat;

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

  return (
    <div>
      <CompareHeader />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          interpolation="natural"
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ plotData1 }
          // domain={{x: [1, 16], y: [0, 600]}}
        />
        <VictoryLine
        interpolation="natural"
        style={{
          data: { stroke: "#c43a31" },
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
