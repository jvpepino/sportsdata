import React , { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { SearchForm, CompareForm } from '../components'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchForm: true,
    }
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm () {
    this.setState({
      showSearchForm: !this.state.showSearchForm
    })
  }

  render () {
    const {children, handleClick, isLoggedIn} = this.props

    return (
      <div>
        <h1>Sportistics</h1>
        <button onClick={this.toggleForm}>Toggle Search</button>
        <hr />
        { this.state.showSearchForm &&
          <SearchForm />
        }
        { !this.state.showSearchForm &&
          <CompareForm />
        }
        <hr />
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
// Main.propTypes = {
//   children: PropTypes.object,
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }

// {
//   isLoggedIn
//     ? <div>
//       {/* The navbar will show these links after you log in */}
//       <Link to="/home">Home</Link>
//       <a href="#" onClick={handleClick}>Logout</a>
//     </div>
//     : <div>
//       {/* The navbar will show these links before you log in */}
//       <Link to="/login">Login</Link>
//       <Link to="/signup">Sign Up</Link>
//     </div>
// }
