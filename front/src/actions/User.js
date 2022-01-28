import config from '../config'
import { connect } from 'react-redux'
import axios from '../config/axios.js'


export function authenticate(token) {
    return {
        type: 'AUTHENTICATE',
        payload: axios.post(config.apiEndpoint + '/auth/me', token)
    }
}

export function tokenAuthorization() {
    return {
        type: 'TOKEN_AUTH',
        payload: axios.post(config.apiEndpoint + '/auth/me')
    }
}

export function dismantleLoginForm() {
    return {
        type: 'DISMANTLE_LOGIN_FORM'
    }
}


export function dismantleRegisterForm() {
    return {
        type: 'DISMANTLE_REGISTER_FORM'
    }
}

export function login(data) {
    console.log('LOGIN DATA: ', data)
    return {
        type: 'LOGIN',
        payload: axios.post(config.apiEndpoint + '/auth/login', data)
    }
}

export function logout(data) {
    return {
        type: 'LOGOUT'
    }
}

export function register(data) {
    console.log('register data: ', data)
    return {
        type: 'REGISTER',
        payload: axios.post(config.apiEndpoint + '/auth/register', data)
    }
}
