import React from 'react'
import { connect } from 'react-redux'
import Logo from 'static/images/urbinsight_logo_v1.png'
import Login from 'containers/Login'
import { loginUser, logoutUser, signUpUser } from 'redux/modules/auth'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { capitalizeFirstLetter } from 'utils/generalUtils'
import { Link } from 'react-router'

type Props = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  onLoginClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  onSignUpClick: PropTypes.func
}

class AppHeader extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      LoginModalOpened: false
    }
    this.statusChange = this.statusChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  statusChange (status) {
    let newStatus = !this.state.LoginModalOpened
    this.setState({
      LoginModalOpened: newStatus
    })
  }
  handleClick () {
    let newState = !this.state.LoginModalOpened
    this.setState({
      LoginModalOpened: newState
    })
  }
  render () {
    const { dispatch, isAuthenticated, errorMessage, onLoginClick, onLogoutClick, onSignUpClick } =
    this.props
    const returnedModal = window.location.pathname.slice(1) !== '' && !this.state.LoginModalOpened
      ? <Login errorMessage={errorMessage}
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        modalStatus={!isAuthenticated}
        statusChange={this.statusChange}
     /> : null
    return (
      <div>
        <Navbar inverse fluid fixedTop isAuthenticated={isAuthenticated}
          errorMessage={errorMessage} dispatch={dispatch}>
          <Navbar.Header>
            <Navbar.Brand>
              <a style={{'display': 'inline-block'}} href='http://www.urbinsight.com'>
                <img className='header-logo' src={Logo} />
              </a>
              <h3 className='city-title'>{capitalizeFirstLetter(window.location.pathname.slice(1))}</h3>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title='Explore Maps' id='basic-nav-dropdown'>
                <MenuItem eventKey={1.1} href='/medellin'>Medellin</MenuItem>
                <MenuItem eventKey={1.2} href='/cusco'>Cusco</MenuItem>
                <MenuItem eventKey={1.3} href='/abudhabi'>Abu Dhabi</MenuItem>
                <MenuItem eventKey={1.4} href='/lima'>Lima</MenuItem>
                <MenuItem eventKey={1.5} href='/budapest'>Budapest</MenuItem>
                <MenuItem eventKey={1.6} href='/admin'>Admin</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={2} title='Partner Cities' id='basic-nav-dropdown'>
                <MenuItem eventKey={2.1} href='http://medellin.urbinsight.com'>Medellin</MenuItem>
                <MenuItem eventKey={2.2} href='http://cusco.urbinsight.com'>Cusco</MenuItem>
                <MenuItem eventKey={2.3} href='http://abudhabi.urbinsight.com'>Abu Dhabi</MenuItem>
                <MenuItem eventKey={2.4} href='http://lima.urbinsight.com'>Lima</MenuItem>

              </NavDropdown>
              <NavItem eventKey={3} href='http://wiki.urbinsight.com'>Wiki</NavItem>
              {/* <NavItem eventKey={4} href='#'>About</NavItem>
              <NavItem eventKey={5} href='#'>Help</NavItem>*/}
              {!isAuthenticated && <NavItem eventKey={6} href='#' onClick={this.handleClick}>Login | Sign Up</NavItem>}
              {isAuthenticated && <NavItem eventKey={6} onClick={onLogoutClick}>Logout</NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         {returnedModal}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth
  return {
    isAuthenticated,
    errorMessage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (creds) =>
      dispatch(loginUser(creds)),

    onLogoutClick: () =>
      dispatch(logoutUser()),

    onSignUpClick: (creds) =>
      dispatch(signUpUser(creds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader)
