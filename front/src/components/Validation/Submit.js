import React from 'react'

export default class Submit extends React.Component {

    constructor() {
        super()
    }

    render() {

        let { className } = this.props

        return <button className={className} onClick={this.callback}>
                    {this.props.children}
               </button>

    }


}