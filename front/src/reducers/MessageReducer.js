const initialState = {
    userMessages: {
        list: [],
        fetching: false,
        initialLoad: false
    },
    currentMessage: {
        data: {
            responses: []
        },
        fetching: false,
        loaded: false
    }
}

let MessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MESSAGES_PENDING':
            return {
                ...state,
                userMessages: {
                    ...state.userMessages,
                    fetching: true
                }
            }
        case 'GET_MESSAGES_FULFILLED':
            return {
                ...state,
                userMessages: {
                    list: [{
                        title: 'Bla bla bla',
                        slug: 'bla-bla-bla'
                    }, {
                        title: 'blablalbla',
                        slug: 'blablalbl'
                    }],
                    fetching: false,
                    initialLoad: true
                }
            }
        case 'GET_MESSAGES_REJECTED':
            return {
                ...state,
                userMessages: {
                    list: [{
                        title: 'Bla bla bla',
                        slug: 'bla-bla-bla'
                    }, {
                        title: 'blablalbla',
                        slug: 'blablalbl'
                    }],
                    fetching: false,
                    initialLoad: true
                }
            }

        case 'GET_MESSAGE_PENDING':
            return {
                ...state,
                currentMessage: {
                    ...state.currentMessage,
                    fetching: true,
                }
            }
        case 'GET_MESSAGE_FULFILLED':
            return {
                ...state,
                currentMessage: {
                    data: {
                        title: 'test title',
                        content: 'test content'
                    },
                    fetching: false,
                    loaded: true
                }
            }
        case 'GET_MESSAGE_REJECTED':
            return {
                ...state,
                currentMessage: {
                    report: {
                        slug: 'keira-okuneva'
                    },
                    data: {
                        title: 'test title',
                        content: 'test content',
                        responses: [{
                            sender: 'websterskjy@gmail.com',
                            receiver: 'r3k1n@tlen.pl',
                            date_sent: 'wczoraj o 13:02',
                            content: 'Witam, wczoraj zgubiłem podobny portfel, można się z Panem skontaktować?'
                        }, {
                            receiver: 'websterskjy@gmail.com',
                            sender: 'r3k1n@tlen.pl',
                            date_sent: 'wczoraj o 13:06',
                            content: 'Si senior, call me 312-31-12'
                        }]                    
                    },
                    fetching: false,
                    loaded: true
                }
            }

        case 'SEND_MESSAGE_PENDING':
            return state
        case 'SEND_MESSAGE_FULFILLED':
            return state
        case 'SEND_MESSAGE_REJECTED':
            return state
        default:
            return state
    }
}

export default MessageReducer