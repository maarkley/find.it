import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as MapActions from '../../actions/Map'
import ReactSVG from 'react-svg'

class ReportView extends React.Component {

    constructor() {
        super()
    }


    componentDidMount() {

        let { slug } = this.props.match.params

        let existingReport = this.props.map.markers.filter((item) => {
            return item.slug == slug
        })

        if ( existingReport.length > 0 ) {
            this.props.dispatch(MapActions.setCurrentReport(slug))
        } else {
            this.props.dispatch(MapActions.getReportBySlug(slug))            
        }

    }

    componentWillUnmount() {
        // this.props.dispatch(MapActions.clearCurrentReport())
    }

    render() {

        let { name, description, category, time } = this.props.map.currentReport

        return <div className="report-view">
                    <div className="heading-row">
                        <Link to="/" className="back-btn">{"< POWRÓT"}</Link>
                        <h3 className="big-title">{name}</h3>
                        <div className="filter-bar">
                        {this.props.user.authenticated ? this.renderContactBtn() : this.renderContactInfo()}
                        </div>
                    </div>
                    <div className="body-row">
                        <div className="spacer">
                            <div className="report-content">
                                <div className="report-info-bar">
                                <div className="split">
                                        <div className="item date">
                                            <ReactSVG path="/img/calendar.svg"
                                                    className="icon icon-theme" />
                                            <div className="txt">{time}</div>
                                        </div>
                                        <div className="item location">
                                            <ReactSVG path="/img/marker.svg"
                                                    className="icon icon-theme" />
                                            <div className="txt">Szczecin, Al. Wojska Polskiego</div>
                                        </div>
                                        <div className="item category">
                                            <ReactSVG path="/img/category.svg"
                                                    className="icon icon-theme" />
                                            <div className="txt">{category.name}</div>
                                        </div>
                                    </div>
                                    <div className="split">
                                        <div className="item photos">
                                            <ReactSVG path="/img/camera.svg"
                                                    className="icon icon-theme" />
                                            <div className="txt">Brak zdjec</div>
                                        </div>
                                        <div className="item location">
                                            <ReactSVG path="/img/tag.svg"
                                                    className="icon icon-theme" />
                                            <div className="txt">tag 1, tag 2</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    {description}
                                </div>
                            </div>     
                        </div>   
                    </div>
               </div>

    }

    renderContactBtn() {
        return <Link to={"/wiadomosc/" + this.props.map.currentReport.slug} className="btn" title="Skontaktuj sie">Skontaktuj sie</Link>
    }

    renderContactInfo() {
        return <div className="default-desc">Musisz sie <Link to="/logowanie">zalogowac</Link>, by moc sie skontaktowac.</div>
    }

}

export default connect((state) => {
    return {
        user: state.user,
        map: state.map
    }
}, null, null, {
    pure: false
})(ReportView)