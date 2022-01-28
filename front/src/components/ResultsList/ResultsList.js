import React from 'react'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import HoverBox from './HoverBox'

class ResultsList extends React.Component {

    constructor() {
        super()
    }

    render() {

        return <div>
                <HoverBox show={this.props.map.hoverBox.show} description={this.props.map.hoverBox.description} tags="test tags"/>
                <div className="heading-row">
                    <h3 className="big-title">Znalezione</h3>
                    <div className="results-count">
                        {this.props.map.markers.length + " wyników"}
                    </div>
                    <div className="filter-bar">
                        <div className="btn">Dodaj filtr</div>
                        <div className="btn btn--filter">
                            <span className="filter-name">Miasto: </span>
                            <span className="filter-value">Szczecin</span>
                            <span className="close"></span>                                
                        </div>                                                    
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
                            <div className="location">
                            Dodano
                            </div>
                        </div>
                        <div className="results-list__body">
                            {this.props.markers.map((item, key) => {
                                return <ListItem key={key} data={item} baseUrl="/zgloszenie/" />                    
                            })}                    
                        </div>
                </div>
               </div>
            </div>

    }

}

export default connect((state) => {
    return {
        map: state.map,
        markers: state.map.markers
    }
}, null, null, {
    pure: true
})(ResultsList)