import {connect} from 'react-redux';
import React, {Component} from 'react';
import {PlayerHeader} from '../components'
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
    selected: [0]
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleSubmit = (event, selectedPosition) => {
    event.preventDefault();
    let statCat = event.target.category.value;
    if (statCat.slice(-1) === '%') {
      statCat = statCat.slice(0, -1) + '_Pct';
    }
    this.props.history.push(`/player/${selectedPosition}/${statCat}`)
  }

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
      <div>
        <PlayerHeader />
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
        <hr />
        <form onSubmit={(event) => this.handleSubmit(event, selectedPosition)} name='playerChart'>
          <label htmlFor="category"><h3>Select Individual Stat</h3></label>
          <select name="category" type="text">
            { !!gamelogs[0] && gamelogs[0].keyStats.map(stat =>
              (<option key={stat['@abbreviation']} value={stat['@abbreviation']}>
                {stat['@abbreviation']}
              </option>)
            )}
          </select>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamelogs: state.gamelogs
})

export default connect(mapStateToProps)(PlayerTable);
