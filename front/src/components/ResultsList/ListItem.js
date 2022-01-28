import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Map from '../../actions/Map'

class ListItem extends React.Component {

    constructor() {
        super()
    }

    render() {
        console.log('list item: ', this.props.key)
        let { slug, name, category, time } = this.props.data
        let baseUrl = this.props.baseUrl
        return  <div className="results-list__item" onMouseEnter={this.showHoverBox.bind(this, this.props.data)} onMouseLeave={this.hideHoverBox.bind(this)}>
                    <Link to={baseUrl + slug}>
                        <h4 className="name">
                            {name}
                        </h4>
                        <div className="category">
                            {category.name}
                        </div>
                        <div className="location">
                            Szczecin, al. Wojska Polskiego 43
                        </div>
                        <div className="added">
                            {time}
                        </div>
                    </Link>
                </div>
    }

    showHoverBox(data) {
        this.props.dispatch(Map.showHoverBox(data))
    }
    hideHoverBox() {
        this.props.dispatch(Map.hideHoverBox())
    }

}

export default connect((state) => {
    return {}
})(ListItem)