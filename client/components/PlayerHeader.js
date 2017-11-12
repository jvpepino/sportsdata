import {connect} from 'react-redux';
// import {withRouter, Link} from 'react-router-dom';
import React, {Component} from 'react';

const PlayerHeader = (props) => {
  const {gamelogs, children} = props;
  if (gamelogs.length) {
    const playerDetails = gamelogs[0].player;
    const teamDetails = gamelogs[0].team;
    const {ID, FirstName, LastName, JerseyNumber, Position} = playerDetails;
    const {Name, City} = teamDetails;
    return (
      <div>
        <h3>{`${City} ${Name} - #${JerseyNumber} ${Position}`}</h3>
        <h2>{`${FirstName} ${LastName}`}</h2>
        <hr />
        {children}
      </div>
    )
  }
  else {
    return <div />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHeader);
