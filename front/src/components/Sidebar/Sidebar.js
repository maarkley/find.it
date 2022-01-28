import React from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import ResultsList from '../ResultsList'
import ReportView from '../ReportView'
import UserReports from '../UserReports'
import AddItemForm from '../AddItemForm'
import MessagesList from '../MessagesList'
import CreateMessage from '../CreateMessage'
import MessageView from '../MessageView'
import * as MapActions from '../../actions/Map'
import toastr from 'toastr'

class Sidebar extends React.Component {

    constructor() {
        super()
    }

    componentWillMount() {
        this.props.dispatch(MapActions.getAllReports())
    }
    

    render() {
        let sidebarMode = this.props.map.addItemForm.addMarkerMode ? 'tuck-in' : ''
        return <div className={"sidebar " + sidebarMode }>
                        <Route exact path="/" component={ResultsList} />
                        <Route path="/zgloszenie/:slug" component={ReportView} />
                        <Route path="/twoje-zgloszenia" component={UserReports} />                        
                        <Route path="/dodaj-znaleziony-przedmiot" component={AddItemForm} />
                        <Route exact path="/wiadomosci" component={MessagesList} />   
                        <Route exact path="/wiadomosci/:slug" component={MessageView} />                           
               </div>

    }

    



}

export default connect((state) => {
    return {
        authenticated: state.user.authenticated,
        user: state.user.user,
        map: state.map
    }
}, null, null, {
    pure: false
})(Sidebar)