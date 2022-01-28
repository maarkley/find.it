import React from 'react'
import * as UserActions from '../../actions/User'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'

const initialState = {
    email: {
        value: '',
        valid: true,
        message: ''
    },
    password: {
        value: '',
        valid: true,
        message: ''
    },
    submit: {
        disabled: true
    },
    showTitle: false

}

class Login extends React.Component {

    constructor() {
        super()
        this.state = initialState
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            showTitle: true
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log('this props: ', this.props)
        console.log('next props: ', nextProps)
        
        if ( nextProps.authenticated ) {
            // this.props.history.push('/')
            this.props.history.goBack()
        }

    }

    componentWillEnter() {
        console.log('will enter')
    }

    componentWillLeave() {
        console.log('will leave')
    }

    componentWillUnmount() {
        // this.setState(Object.assign({}, this.state, initialState))
        // this.props.dispatch((UserActions.dismantleLoginForm()))        
    }

    render() {
        
        let { email, password } = this.props.loginForm.fields
        let emailStatus = email.valid ? '' : 'invalid'
        let passwordStatus = password.valid ? '' : 'invalid'

        return  <Fade in={this.state.showTitle} timeout={0} onExitedCallback={this.onExited.bind(this)}>
                    <div className="form-popup">
                        <div className="form-popup__box">
                            <div className="close" onClick={this.navigateBack.bind(this)}>
                            </div>
                            <h4 className="form-popup__box__title">
                                Zaloguj sie
                            </h4>
                            <form className="default-form">
                                <div className={"form-input-group " + emailStatus }>
                                    <label>E-mail:</label>
                                    <div className="input-wrapper">
                                    <input type="email" onChange={this.changeHandler.bind(this)} name="email"/>
                                        <div className="form-input-group__message">{email.message}</div>
                                    </div>                                
                                </div>
                                <div className={"form-input-group " + passwordStatus }>
                                    <label>Hasło:</label>
                                    <div className="input-wrapper">
                                        <input type="password" onChange={this.changeHandler.bind(this)} name="password"/>
                                        <div className="form-input-group__message">{password.message}</div>
                                    </div>
                                </div>
                                <div className={"btn btn-small "} onClick={this.submit.bind(this)}>
                                    Zaloguj sie
                                </div>
                                <p>
                                    Nie masz jeszcze konta? <Link to="/rejestracja">Zarejestruj sie tutaj!</Link>
                                </p>
                            </form>
                        </div>      
                </div>
               </Fade>
    }

    navigateBack() {
        this.setState({...this.state, showTitle: false})
        console.log('hiding component')
    }

    onExited() {
        console.log("EXITED")
        this.props.history.push('/')
    }

    changeHandler(e) {

        let target = e.target.getAttribute('name')
        let targetObj = {}
        targetObj[target] = this.state[target]
        targetObj[target].value = e.target.value
        this.setState(Object.assign({}, this.state, targetObj))
        

    }

    submit() {

        this.props.dispatch(UserActions.login({
            email: this.state.email.value,
            password: this.state.password.value,
        }))

    }
}

export default connect((state) => {
    return {
        loginForm: state.user.loginForm,
        authenticated: state.user.authenticated,
        user: state.user.user
    }
  }, null, null, {
      pure: true
  })(Login)



  const defaultStyle = {
    transition: `all 220ms ease-in-out`,
    opacity: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exit: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 }
  };
  
  function logit() {
      console.log("EXITED")
  }
  const Fade = ({ in: inProp, children, onExitedCallback }) => {
    return (
    <Transition 
    in={inProp} 
    timeout={0} 
        onExited={onExitedCallback}
        >
    {(state) => {
        return React.cloneElement(children, { style: { ...defaultStyle, ...transitionStyles[state] } }) }
    }
    </Transition>
  );
}