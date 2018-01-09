import React from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'

import {Main, PlayerTable, PlayerChart, PlayerCompare, CompareHeader } from './components'

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Router history={history}>
      <Main>
        <Switch>
          <Route exact path="/player/:position" component={PlayerTable} />
          <Route path="/player/:position/:statCat" component={PlayerChart} />
          <Route exact path="/compare/:position/" component={CompareHeader} />
          <Route path="/compare/:position/:statCat" component={PlayerCompare} />
        </Switch>
      </Main>
    </Router>
  )
}

export default Routes
