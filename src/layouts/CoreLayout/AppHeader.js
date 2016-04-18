import React from 'react'
import { connect } from 'react-redux'
import Logo from 'static/images/urbinsight_logo_v1.png'
import Login from 'containers/Login'
import { loginUser } from 'redux/modules/auth'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

type Props = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  onLoginClick: PropTyps.func
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
    this.setState({
      LoginModalOpened: status
    })
  }
  handleClick () {
    let newState = !this.state.LoginModalOpened
    this.setState({
      LoginModalOpened: newState
    })
  }
  render () {
    const { dispatch, isAuthenticated, errorMessage, onLoginClick } = this.props
    console.log(this.props)
    return (
      <div>
        <Navbar inverse fluid fixedTop isAuthenticated={isAuthenticated}
          errorMessage={errorMessage} dispatch={dispatch}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'><img id='header-logo' src={Logo}></img></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title='Explore Data' id='basic-nav-dropdown'>
                <MenuItem eventKey={1.1} href='/medellin'>Medellin</MenuItem>
                <MenuItem eventKey={1.2} href='/cusco'>Cusco</MenuItem>
                <MenuItem eventKey={1.3} href='/abudhabi'>Abu Dhabi</MenuItem>
                <MenuItem eventKey={1.3} href='/lima'>Lima</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={2} title='Partner Cities' id='basic-nav-dropdown'>
                <MenuItem eventKey={2.1} href='http://medellin.urbinsight.com'>Medellin</MenuItem>
                <MenuItem eventKey={2.2} href='http://cusco.urbinsight.com'>Cusco</MenuItem>
                <MenuItem eventKey={2.3} href='http://abudhabi.urbinsight.com'>Abu Dhabi</MenuItem>
                <MenuItem eventKey={2.3} href='http://lima.urbinsight.com'>Lima</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href='http://wiki.urbinsight.com'>Wiki</NavItem>
              <NavItem eventKey={4} href='#'>About</NavItem>
              <NavItem eventKey={5} href='#'>Help</NavItem>
              <NavItem eventKey={6} href='#' onClick={this.handleClick}>Login</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <Login modalStatus={this.state.LoginModalOpened} statusChange={this.statusChange}/>*/}
         {!isAuthenticated &&
           <Login errorMessage={errorMessage}
             onLoginClick={onLoginClick}
             modalStatus={!isAuthenticated}
          />
        }
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
      dispatch(loginUser(creds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader)
