import axios from 'axios'
import toastr from 'toastr'
import jwt from 'jsonwebtoken'
import config from '../config'
import * as UserController from '../controllers/UserController/'

const initialState = {
    authenticated: false,
    authenticating: false,
    isAuthenticating: false,
    user: {
        login: '',
        name: '',
        email: ''
    },
    loginForm: {
        fields: {
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
        },
        status: 'default'        
    },
    registerForm: {
        fields: {
            email: {
                value: '',
                valid: true,
                message: ''
            },
            name: {
                value: '',
                valid: true,
                message: ''
            },
            password: {
                value: '',
                valid: true,
                message: ''
            },
            password_confirmation: {
                value: '',
                valid: true,
                message: ''
            }
        },
        status: 'default',
        registered: false
    }
}

let UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'DISMANTLE_LOGIN_FORM':
            return Object.assign({}, state, {
                loginForm: initialState.loginForm
            })
        case 'DISMANTLE_REGISTER_FORM':
            console.log('initial state: ', initialState)
            return Object.assign({}, state, {
                registerForm: {
                    fields: {
                        email: {
                            value: '',
                            valid: true,
                            message: ''
                        },
                        name: {
                            value: '',
                            valid: true,
                            message: ''
                        },
                        password: {
                            value: '',
                            valid: true,
                            message: ''
                        },
                        password_confirmation: {
                            value: '',
                            valid: true,
                            message: ''
                        }
                    },
                    status: 'default',
                    registered: false
                }
            })


        case 'LOGIN_PENDING':
            return UserController.LogIn.pending(state, action) 
        case 'LOGIN_FULFILLED':
            return UserController.LogIn.fulfilled(state, action)
        case 'LOGIN_REJECTED':
            return UserController.LogIn.rejected(state, action)
        

        case 'TOKEN_AUTH_PENDING':
            return {
                ...state,
                authenticating: true,
                isAuthenticating: true
            }
        case 'TOKEN_AUTH_REJECTED':
            return {
                ...state,
                isAuthenticating: false,
                authenticatingError: 'Error while authenticating'
            }
        case 'TOKEN_AUTH_FULFILLED':
        console.log('token auth fulfilled: ', action)
            return {
                ...state,
                authenticated: true,
                isAuthenticating: false,
                user: action.payload.data.data.user
            }


        case 'REGISTER_PENDING':
            return UserController.Register.pending(state, action)
        case 'REGISTER_REJECTED':
            return UserController.Register.rejected(state, action)  
        case 'REGISTER_FULFILLED':
            return Object.assign({}, state, {
                registerForm: {
                    ...state.registerForm,
                    registered: true
                }
            })

        case 'LOGOUT':
            axios.defaults.headers.common['Authorization'] = ''

            toastr.info('Zostales wylogowany.')

            if ( localStorage.getItem('Authorization') ) {
                console.log('clearing local storage')
                localStorage.removeItem('Authorization')
            }

            return {
                ...state,
                authenticated: false,
                user: {}
            }


        default:
            return state
    }

}

export default UserReducer