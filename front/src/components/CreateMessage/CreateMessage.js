import React from 'react'
import { connect } from 'react-redux'

class CreateMessage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return <div>
                                <div className="sidebar-form__group">
                                    <label>
                                        Napisz wiadomość: 
                                    </label>
                                    <textarea type="text" name="name" ></textarea>
                                </div>
                                <div className="btn btn--small">
                                    Wyślij
                                </div>
                </div>    
    }


}

export default connect((state) => {
    return {
        currentReport: state.map.currentReport
    }
})(CreateMessage)