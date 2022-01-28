import React from 'react'
import  { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ListItem from '../ResultsList/ListItem'


class UserReports extends React.Component {

    constructor() {
        super()
    }

    render() {
        console.log('this.props: ', this.props)
        return <div>
                <div className="heading-row">
                <Link to="/" className="back-btn">{"< POWRÓT"}</Link>

                    <h3 className="big-title">Twoje zgłoszenia</h3>
                    <div className="results-count">
                        {this.props.userReports.length + " wyników"}
                    </div>
                </div>
                <div className="body-row">  
                    <div className="results-list">
                        <div className="results-list__header">
                            <div className="name">
                            Nazwa
                            </div>
                            <div className="category">
                            Kategoria
                            </div>
                            <div className="location">
                            Miejsce
                            </div>
                        </div>
                        <div className="results-list__body">
                            {this.props.userReports.map((item, key) => {
                                return <ListItem key={key} data={item} baseUrl="/twoje-zgloszenia/" />                    
                            })}                    
                        </div>
                </div>
               </div>
            </div>
    }

}

export default connect((state) => {
    return {
        userReports: state.map.userReports
    }
})(UserReports)