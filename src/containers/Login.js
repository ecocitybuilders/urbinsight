import React, { PropTypes } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Logo from 'static/images/urbinsight_logo_v1.png'
// import { EmailSignInForm } from 'redux-auth/bootstrap-theme'
type Props = {
  modalStatus: PropTypes.bool,
  statusChange: PropTypes.func,
  onLoginClick: PropTypes.func,
  onSignUpClick: PropTypes.func
}

const isEmail = function (email) {
  let re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
  return re.test(email)
}

const validatePassword = function (password) {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return re.test(password)
}

export class Login extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      showModal: props.modalStatus,
      authToggle: 'login',
      email: '',
      password: '',
      confirm: ''
    }
    this.close = this.close.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getEmailValidationState = this.getEmailValidationState.bind(this)
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this)
    this.getPasswordConfirmValidationState = this.getPasswordConfirmValidationState.bind(this)
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
      const username = this.refs.username
      const password = this.refs.password
      const creds = { username: username.props.value.trim(), password: password.props.value.trim() }
      this.props.onLoginClick(creds)
    }
  }

  handleSignUpClick () {
    if (this.state.authToggle !== 'signup') {
      this.setState({
        authToggle: 'signup'
      })
    } else {
      const username = this.refs.username
      const password = this.refs.password
      const creds = { username: username.props.value.trim(), password: password.props.value.trim() }
      this.props.onSignUpClick(creds)
    }
  }

  handleChange (e) {
    var obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  getEmailValidationState () {
    if (this.state.email.length === 0) {
      return null
    } else {
      return isEmail(this.state.email) ? 'success' : 'error'
    }
  }

  getPasswordValidationState () {
    if (this.state.password.length === 0) {
      return null
    } else {
      return validatePassword(this.state.password) ? 'success' : 'error'
    }
  }

  getPasswordConfirmValidationState () {
    if (this.state.confirm.length === 0) {
      return null
    } else {
      return this.state.password === this.state.confirm ? 'success' : 'error'
    }
  }

  render () {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title className='login-modal-title'>
              <img className='header-logo' src={Logo}></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 style={{ display: this.state.authToggle === 'login' ? 'inline' : 'none' }}>Login</h3>
            <h3 style={{ display: this.state.authToggle === 'signup' ? 'inline' : 'none' }}>Sign Up</h3>
            <form style={{'marginTop': '15px'}}>
              <FormGroup
                controlId='email'
                validationState={this.getEmailValidationState()}
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  ref='username'
                  type='email'
                  value={this.state.email}
                  placeholder='Email'
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId='password'
                validationState={this.getPasswordValidationState()}
              >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  ref='password'
                  type='password'
                  value={this.state.password}
                  placeholder='Password'
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId='confirm'
                validationState={this.getPasswordConfirmValidationState()}
                style={{ display: this.state.authToggle === 'signup' ? 'inherit' : 'none' }}
              >
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  ref='confirm'
                  type='password'
                  value={this.state.confirm}
                  placeholder='Confrim Password'
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
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
