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
  gamelogs: state.gamelogs
})

export default connect(mapStateToProps)(PlayerHeader);
