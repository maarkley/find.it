import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import * as UserActions from '../../actions/User'

class Navbar extends React.Component {

    constructor() {
        super()
    }

    render() {
        console.log('NAVBAR PROPS: ', this.props)
        let breadcrumbs = this.props.location.pathname.split('/')
        breadcrumbs.shift()
        
        return  <div className="navbar navbar--theme navbar--spacer">
                    <div className="left">
                        <Link className="action-link" to="/" >
                            <div className="icon stroke-theme">
                                <ReactSVG path="/img/001-home.svg" />
                            </div>                    
                            <div className="txt">Home</div>
                        </Link>
                        {
                            breadcrumbs.map((item, key) => {
                                let prevPart = key > 0 ? breadcrumbs[key - 1] + '/' : ''
                                console.log('prevPart: ', prevPart)
                                
                                return (<Link className="action-link" to={"/" + prevPart + item} key={key} >
                                            <div className="txt">{"/ " + item}</div>
                                        </Link>)
                            })
                        }
                    </div>
                    <div className="right">
                    <Link className="action-link" to="/dodaj-znaleziony-przedmiot">
                            <div className="icon icon--plus"></div>
                            <div className="txt">Dodaj nowy</div>
                        </Link>
                        {this.props.user.authenticated ? this.renderForAuthenticated() : this.renderForUnauthenticated()}
                        
                    </div>
                </div>
    }

    renderForAuthenticated() {
        return <div className="user-info">
                    <Link className="action-link" to="/wiadomosci">
                        <div className="icon fill-theme">
                            <ReactSVG path="/img/icons/envelope.svg" />
                        </div>
                        <div className="txt">Wiadomości</div>
                    </Link>
                    <Link className="action-link" to="/twoje-zgloszenia">
                        <div className="icon stroke-theme">
                            <ReactSVG path="/img/001-folder.svg" />
                        </div>
                        <div className="txt">Twoje zgłoszenia</div>
                    </Link>
                   
                    <div className="txt">
                        <span>Zalogowany jako:</span> {this.props.user.user.email}
                    </div>
                    <div className="action-link" onClick={this.logout.bind(this)}>
                        <div className="icon stroke-theme">
                            <ReactSVG path="/img/001-logout.svg" />
                        </div>
                        <div className="txt">Wyloguj</div>
                    </div>
               </div>
    }

    renderForUnauthenticated() {
        return <div className="col">
                    <Link className="action-link" to="/logowanie">
                        <div className="txt">Logowanie</div>
                    </Link>
                    <Link className="action-link" to="/rejestracja">
                        <div className="txt">Rejestracja</div>
                    </Link>
               </div>
    }

    logout() {
        this.props.dispatch(UserActions.logout())
    }

} 

export default connect((state) => {
    return {
        user: state.user
    }
})(Navbar)