import React from 'react'

export default class Transition extends React.Component {

    constructor() {
        super()
        console.log('CHILDREN: ', this.props)
    }

    render() {
        return React.cloneElement(this.props.children, {styles: 'testes'})
    }

}