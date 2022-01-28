import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MyStore from './reducers'
import styles from './scss/style.scss'


let el = document.getElementById('app')

ReactDOM.render(<Provider store = {MyStore}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>, el)
