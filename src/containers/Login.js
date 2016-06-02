import React, { PropTypes } from 'react'
import { Modal, Button, Input } from 'react-bootstrap'
import Logo from 'static/images/urbinsight_logo_v1.png'
// import { EmailSignInForm } from 'redux-auth/bootstrap-theme'
type Props = {
  modalStatus: PropTypes.bool,
  statusChange: PropTypes.func,
  onLoginClick: PropTypes.func,
  onSignUpClick: PropTypes.func
}
export class Login extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      showModal: props.modalStatus,
      authToggle: 'login'
    }
    this.close = this.close.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }
  close () {
    this.props.statusChange()
  }
  componentWillReceiveProps (props) {
    this.setState({showModal: props.modalStatus})
  }
  handleLoginClick () {
    if (this.state.authToggle !== 'login') {
      this.setState({
        authToggle: 'login'
      })
    } else {
      const username = this.refs.username.refs.input
      const password = this.refs.password.refs.input
      const creds = { username: username.value.trim(), password: password.value.trim() }
      this.props.onLoginClick(creds)
    }
  }

  handleSignUpClick () {
    if (this.state.authToggle !== 'signup') {
      this.setState({
        authToggle: 'signup'
      })
    } else {
      const username = this.refs.username.refs.input
      const password = this.refs.password.refs.input
      const creds = { username: username.value.trim(), password: password.value.trim() }
      this.props.onSignUpClick(creds)
    }
  }
  render () {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title id='login-modal-title'>
              <img id='header-logo' src={Logo}></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 style={{ display: this.state.authToggle === 'login' ? 'inline' : 'none' }}>Login</h3>
            <h3 style={{ display: this.state.authToggle === 'signup' ? 'inline' : 'none' }}>Sign Up</h3>
            <form style={{'marginTop': '15px'}}>
              <Input type='email' ref='username' placeholder='Email'/>
              <Input type='password' ref='password' placeholder='Password' />
              <Input type='password' ref='confirm-password' placeholder='Confirm Password'
                style={{ display: this.state.authToggle === 'signup' ? 'inline' : 'none' }}/>
            </form>
            {/* <EmailSignInForm />*/}
          </Modal.Body>
          <Modal.Footer id='login-modal-footer'>
            <div className='login-button-helper'>
              <Button onClick={this.handleLoginClick}
                className='auth-buttons'
                bsStyle='primary' bsSize='large' block>{this.state.authToggle === 'login' ? 'Submit' : 'Login'}
              </Button>
            </div>
            <div className='login-button-helper'>
              <Button onClick={this.handleSignUpClick}
                className='auth-buttons'
                bsStyle='success' bsSize='large' block>{this.state.authToggle === 'signup' ? 'Submit' : 'Sign Up'}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Login
