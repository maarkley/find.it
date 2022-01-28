import React from 'react'
import * as UserActions from '../../actions/User'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input } from '../Validation'


export default class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            email: {
                value: '',
                valid: false,
                message: ''
            },
            name: {
                value: '',
                valid: false,
                message: ''
            },
            password: {
                value: '',
                valid: false,
                message: ''
            },
            password_confirmation: {
                value: '',
                valid: false,
                message: ''
            },
            submit: {
                disabled: true
            }
        
        }
    }


    componentWillReceiveProps(nextProps) {

        if ( nextProps.registerForm.registered && !this.props.registerForm.registered ) {
            console.log('has registered, this: ', this.props.registerForm.registered, ' next: ', nextProps.registerForm.registered)
            this.props.history.push('/logowanie')
        }
        
    }

    componentWillUnmount() {
        console.log('unmounting, state before: ', this.state)
        
        this.setState(Object.assign({}, this.state, {
            email: {
                value: '',
                valid: false,
                message: ''
            },
            name: {
                value: '',
                valid: false,
                message: ''
            },
            password: {
                value: '',
                valid: false,
                message: ''
            },
            password_confirmation: {
                value: '',
                valid: false,
                message: ''
            },
            submit: {
                disabled: true
            }
        }), () => {
            console.log('unmounted: ', this.state)
        })
        console.log('unmounting: ', this.state)
        this.props.dispatch((UserActions.dismantleRegisterForm()))
        

    }

    componentDidMount() {

        console.log('this state: ', this.state)

    }

    render() {

        
        let { email, name, password, password_confirmation } = this.props.registerForm.fields

        let emailStatus = email.valid ? '' : 'invalid'
        let nameStatus = name.valid ? '' : 'invalid'
        let passwordStatus = password.valid ? '' : 'invalid'
        let password_confirmationStatus = password_confirmation.valid ? '' : 'invalid'
        
        return <div className="form-popup">
                    <div className="form-popup__box">
                        <div className="close" onClick={this.navigateBack.bind(this)}>
                        </div>
                        <h4 className="form-popup__box__title">
                            Zarejestruj sie
                        </h4>
                        <form className="default-form">
                            <div className={"form-input-group " + emailStatus }>
                                <label>E-mail:</label>
                                <div className="input-wrapper">
                                    <input type="email" onChange={this.changeHandler.bind(this)} name="email" placeholder="przyklad@gmail.com"/>
                                    <div className="form-input-group__message">{email.message}</div>
                                </div>                                
                            </div>
                            <div className={"form-input-group " + nameStatus }>
                                <label>Imie:</label>
                                <div className="input-wrapper">
                                    <input type="text" onChange={this.changeHandler.bind(this)} name="name" placeholder="Mariusz"/>                                
                                    <div className="form-input-group__message">{name.message}</div>
                                </div>
                            </div>
                            <div className={"form-input-group " + passwordStatus }>
                                <label>Hasło:</label>
                                <div className="input-wrapper">
                                    <input type="password" onChange={this.changeHandler.bind(this)} name="password"/>
                                    <div className="form-input-group__message">{password.message}</div>
                                </div>
                            </div>
                            <div className={"form-input-group " + password_confirmationStatus }>
                                <label>Powtórz:</label>
                                <div className="input-wrapper">
                                    <input type="password" onChange={this.changeHandler.bind(this)} name="password_confirmation"/>
                                    <div className="form-input-group__message">{password_confirmation.message}</div>
                                    
                                </div>
                            </div>
                            <div className={"btn btn-small " + this.props.registerForm.status} onClick={this.submit.bind(this)}>
                                { this.props.registerForm.status == "pending" ? "Poczekaj chwile..." : "Zarejestruj sie"}
                            </div>
                            <p>
                                Masz już konto? <Link to="/logowanie">Zaloguj sie!</Link>
                            </p>
                        </form>
                    </div>      
               </div>

    }

    navigateBack() {

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

        this.props.dispatch(UserActions.register({
            email: this.state.email.value,
            name: this.state.name.value,
            password: this.state.password.value,
            password_confirmation: this.state.password_confirmation.value
        }))

    }


}


module.exports = connect((state) => {
    return {
        registerForm: state.user.registerForm
    }
  }, null, null, {
      pure: true
  })(Register)