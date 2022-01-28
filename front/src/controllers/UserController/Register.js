import axios from 'axios'

const pending = (state, action) => {
    console.log('pending form: ', state)
    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            status: 'pending'
        }
    }

}

const rejected = (state, action) => {

    let registerValidation = action.payload.response.data
    console.log('register form rejected: ', action)
            if ( action.payload.response.status == 422 ) {
                let newRegisterFormState = Object.assign({}, state.registerForm)
                Object.keys(state.registerForm.fields).map((item, key) => {

                    if ( registerValidation.message[item] ) {     
                        newRegisterFormState.fields[item].valid = false
                        newRegisterFormState.fields[item].message = registerValidation.message[item].join(' ')                        
                    } else {
                        newRegisterFormState.fields[item].valid = true
                        newRegisterFormState.fields[item].message = ''
                    }

                })
                newRegisterFormState.status = 'default'
                newRegisterFormState.registered = false
                return Object.assign({}, state, {
                    registerForm: newRegisterFormState
                })
            }

}

const fulfilled = (state, action) => {

    return state

}

export { pending, rejected, fulfilled }