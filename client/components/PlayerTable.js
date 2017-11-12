import {connect} from 'react-redux';
// import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';
import positionalStats from '../../filterStatCategory';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class PlayerTable extends Component {
  state = {
    selected: [0],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  render() {
    const { gamelogs, match } = this.props;
    const selectedPosition = match.params.position;

    //NFL Position to Category
    const positionToCategories = {
      QB: ['Passing'],
      WR: ['Receiving'],
      TE: ['Receiving'],
      RB: ['Rushing', 'Receiving'],
    };

    const categories = positionToCategories[selectedPosition];

    gamelogs.length && positionalStats(gamelogs, '@category', categories)

    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Game</TableHeaderColumn>
          {
            !!gamelogs[0] && gamelogs[0].keyStats.map(stat =>
              (<TableHeaderColumn key={stat['@abbreviation']}>
                {stat['@abbreviation']}
              </TableHeaderColumn>)
            )
          }
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            gamelogs.length && gamelogs.map((match, index) =>
              (<TableRow key={match.game.id} selected={this.isSelected(index)}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                {
                  match.keyStats.length && match.keyStats.map(stats =>
                    (<TableRowColumn key={stats['#text']}>
                      {stats['#text']}
                    </TableRowColumn>)
                  )
                }
              </TableRow>)
            )
          }
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  gamelogs: state.player
})

const mapDispatchToProps = (dispatch) => ({
  handleSubmit (event) {
    event.preventDefault();
    const name = event.target.name.value;
    const league = event.target.league.value;
    const year = event.target.year.value;

    dispatch(getPlayerThunk(name, league, year))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
