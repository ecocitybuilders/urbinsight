import React, { PropTypes } from 'react'
import { Modal, Button, Input, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
// const { Feedback } = FormControl
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
      authToggle: 'login',
      emailValue: '',
      passwordValue: '',
      confirmValue: ''
    }
    this.close = this.close.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
    // this.getEmailValidationState = this.getEmailValidationState.bind(this)
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
  getValidationState () {
    return 'success'
  }
  getPasswordValidationState () {
    return 'warning'
  }
  getPasswordConfirmValidationState () {
    return 'warning'
  }
  handleChange (e, type) {
    var obj = {}
    obj[type] = e.target.value
    this.setState(obj)
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
          {/* <form>
              <FormGroup
                controlId='email'
                validationState={this.getEmailValidationState()}
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type='email'
                  value={this.state.emailValue}
                  placeholder='Email'
                  onChange={() => this.handleChange('emailValue')}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId='password'
                validationState={this.getPasswordValidationState()}
              >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type='password'
                  value={this.state.emailValue}
                  placeholder='Password'
                  onChange={() => this.handleChange('passwordValue')}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId='confirm{assword'
                validationState={this.getPasswordConfirmValidationState()}
                style={{ display: this.state.authToggle === 'signup' ? 'inherit' : 'none' }}
              >
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  type='password'
                  value={this.state.emailValue}
                  placeholder='Confrim Password'
                  onChange={() => this.handleChange('confirmValue')}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>*/}
            <form style={{'marginTop': '15px'}}>
              <Input type='email' ref='username' placeholder='Email'/>
              <Input type='password' ref='password' placeholder='Password' />
              <Input type='password' ref='confirm-password' placeholder='Confirm Password'
                style={{ display: this.state.authToggle === 'signup' ? 'inline' : 'none' }}/>
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
