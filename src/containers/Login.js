import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, Button, Input } from 'react-bootstrap'
import Logo from 'static/images/urbinsight_logo_v1.png'
import { loginUser } from 'redux/modules/auth'

type Props = {
  modalStatus: PropTypes.bool,
  statusChange: PropTypes.func,
  onLoginClick: PropTypes.func
}
export class Login extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      showModal: props.modalStatus
    }
    this.close = this.close.bind(this)
  }
  close () {
    this.props.statusChange(!this.state.showModal)
  }
  componentWillReceiveProps (props) {
    this.setState({showModal: props.modalStatus})
  }
  handleClick (event) {
    const username = this.refs.username.refs.input
    const password = this.refs.password.refs.input
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title id='login-modal-title'>
              <img id='header-logo' src={Logo}></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type='email' ref='username' placeholder='Email'/>
              <Input type='password' ref='password' placeholder='Password' />
            </form>
          </Modal.Body>
          <Modal.Footer id='login-modal-footer'>
            <div className='login-button-helper'>
              <Button onClick={(event) => this.handleClick(event)}
                className='auth-buttons'
                bsStyle='primary' bsSize='large' block>LOGIN
              </Button>
            </div>
            <div className='login-button-helper'>
              <Button className='auth-buttons' bsStyle='success' bsSize='large' block>SIGN UP</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default Login
