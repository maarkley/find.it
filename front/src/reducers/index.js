import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer from './UserReducer'
import MapReducer from './MapReducer'
import MessageReducer from './MessageReducer'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

let reducers = combineReducers({
    user: UserReducer,
    map: MapReducer,
    messages: MessageReducer
})

let store = createStore(
                        reducers, 
                        applyMiddleware(
                            promiseMiddleware(),
                            logger
                        )
                    )


export default store