import React from 'react'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import toastr from 'toastr'
import * as Message from '../../actions/Message'

class MessagesList extends React.Component {

    constructor() {
        super()
    }

    componentWillMount() {
        if ( this.props.isAuthenticating ) {

        }
        if ( this.props.authenticated ) {
            this.props.dispatch(Message.getMessages())
        } else {
            this.props.history.push('/logowanie')
            toastr.warning('Musisz być zalogowany, żeby widzieć swoje wiadomości.')
        }
    }

    render() {
        return <div className="messages-list">
                    <div className="heading-row">
                        <h3 className="big-title">Twoje wiadomości</h3>
                    </div>
                    <div className="body-row">
                        {
                            this.props.messages.userMessages.list.map((item, key) => {
                                return (<ListItem key={key} 
                                                  title={item.title} 
                                                  slug={item.slug} />)
                            })
                        }
                    </div>
               </div>
    }

}

export default connect((state) => {
    return {
        authenticated: state.user.authenticated,
        isAuthenticating: state.user.isAuthenticating,
        messages: state.messages
    }
})(MessagesList)