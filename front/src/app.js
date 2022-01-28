import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import * as UserActions from './actions/User'

import Navbar from './components/Navbar'
import Header from './components/Header'
import MapContainer from './components/Map'
import Sidebar from './components/Sidebar'
import Register from './components/Register'
import Login from './components/Login'
import AddItemForm from './components/AddItemForm'
import { TransitionGroup, Transition } from 'react-transition-group'

class App extends React.Component {

    componentWillMount() {
        let token = localStorage.getItem("Authorization")
        if ( token ) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            this.props.dispatch(UserActions.tokenAuthorization())
        }

    }

    render() {
        return <div>
                    <Route path="/" component={Navbar} />
                    <MapContainer />
                    <Sidebar />
                    <TransitionGroup>
                        <Switch>
                                <Route path="/rejestracja" component={Register} />
                                <Route path="/logowanie" component={Login} />
                        </Switch>
                    </TransitionGroup>

               </div>

    }

}


const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: 'inline-block',
  backgroundColor: '#8787d8'
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null, null, {
    pure: false
})(App)
