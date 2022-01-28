import axios from 'axios'
import config from '../config'

export function getMessages() {
    return {
        type: 'GET_MESSAGES',
        payload: axios.get(config.apiEndpoint + '/messages')        
    }
}

export function getMessage(slug) {
    return {
        type: 'GET_MESSAGE',
        payload: axios.get(config.apiEndpoint + '/message/' + slug)
    }
}

export function sendMessage(data) {
    return {
        type: 'SEND_MESSAGE',
        payload: axios.post(config.apiEndpoint + '/message', data)
    }
}