import axios from 'axios'
import toastr from 'toastr'

const pending = (state, action) => {
    return {
            ...state, 
            loginForm: {
                ...state.loginForm,
                status: 'pending'
            },
            isAuthenticating: true
        }
}

const rejected = (state, action) => {
        let validation = action.payload.response.data
        if ( action.payload.response.status == 401 ) {
            console.log('status is 401')
            return {
                ...state,
                isAuthenticating: false,             
                loginForm: {
                    ...state.loginForm,
                    fields: {
                        ...state.loginForm.fields,
                        email: {
                            ...state.loginForm.fields.email,
                            valid: false,
                            message: 'Nie ma takiego użytkownika.'
                        }
                    }    
                }
            }
        }
        if ( validation.status == "validation_error" ) {
            let newloginFormState = Object.assign({}, state.loginForm)
            Object.keys(state.loginForm.fields).map((item, key) => {
                if ( validation.message[item] ) {
                    newloginFormState.fields[item].valid = false
                    newloginFormState.fields[item].message = validation.message[item].join(' ')
                } else {
                    newloginFormState.fields[item].valid = true
                    newloginFormState.fields[item].message = ''
                }
            })
            newloginFormState.status = 'default'
            return {
                ...state,
                isAuthenticating: false,
                loginForm: newloginFormState
            }
        }
        if ( validation.status == "error" ) {

            return Object.assign({}, state, {
                isAuthenticating: false,
                loginForm: {
                    fields: {
                        ...state.loginForm.fields,
                        email: {
                            value: state.loginForm.fields.email.value,
                            valid: false,
                            message: validation.message
                        }
                    },
                    status: 'default'
                }
            })
        }


}

const fulfilled = (state, action) => {
    let data = action.payload.data
    let token = data.data.access_token
    console.log('fulfilled login: ', action)
    if ( token ) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

        localStorage.setItem('Authorization', token)
        toastr.success('Zalogowano Cie pomyslnie.')

        return {
            ...state,
            authenticated: true,
            isAuthenticating: false,
            user: data.data.user,
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
                    status: 'default'
                }
            }
        }
    }
    return {...state}
}

export { pending, rejected, fulfilled }
