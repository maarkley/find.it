import React from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import * as Message from '../../actions/Message'
import CreateMessage from '../CreateMessage'
import { Link } from 'react-router-dom'

class MessageView extends React.Component {

    constructor() {
        super()
    }

    componentWillMount() {

        let slug = this.props.match.params.slug
        this.props.dispatch(Message.getMessage(slug))

    }

    render() {

        let report = this.props.messages.currentMessage.report
        let slug = report ? report.slug : ''
        let responses = this.props.messages.currentMessage.data.responses
        let { title, content } = this.props.messages.currentMessage.data

        return <div className="messages-view">
                    <div className="heading-row">
                        <Link to={"/zgloszenie/" + slug } className="back-btn">{"< WRÓC DO OGŁOSZENIA"}</Link>
                        <h3 className="big-title">Wiadomość</h3>
                        <div className="description">do ogłoszenia: <span>{title}</span></div>
                    </div>
                    <div className="body-row">
                        <div className="spacer">
                            <div className="message-responses">
                                {
                                    responses.length > 0 ? responses.map((item, key) => {
                                        let rowType = this.props.user.email == item.receiver ? '' : 'self'        
                                        return (
                                            <div className={"item " + rowType} key={key}>
                                                <div className="content">
                                                    {item.content}
                                                </div>
                                                <div className="sent">
                                                    Wysłano
                                                    <strong>
                                                        {item.date_sent}                                                
                                                    </strong>
                                                </div>
                                            </div>    
                                        )
                                    }) : <div className="status-message">
                                            Jeszcze nie rozpoczęliście rozmowy. Wyślij wiadomość korzystając z formularza poniżej.
                                        </div>
                                }
                            </div>
                            <CreateMessage />
                        </div>
                    </div>
               </div>
    }

}

export default connect((state) => {
    return {
        user: state.user.user,
        authenticated: state.user.authenticated,
        isAuthenticating: state.user.isAuthenticating,
        messages: state.messages
    }
})(MessageView)