import React from 'react';
import FacebookLogin from 'react-facebook-login'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../../config/axios'

class ProfileBox extends React.Component {



  render = () => {
    console.log('authenticated: ', this.props.authenticated)
    return <div className="profile-box">
              {
                this.props.authenticated ? 

                <div className="profile-box__user">
                  <div className="profile-box__user__email">{this.props.user.email}</div>
                  <div className="btn btn--small">Wyloguj sie</div>
                </div>                

                :

                <Link to="/logowanie" className="btn btn--small">
                  Zaloguj sie
                </Link> 

              }

           </div>
  } 
}

module.exports = connect((state) => {
  return {
    authenticated: state.user.authenticated,
    user: state.user.user
  }
})(ProfileBox)


