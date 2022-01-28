import React from 'react'

export default class Form extends React.Component {

    constructor() {
        super()
    }

    render() {
        console.log('form: ', this)


        return <form>
                    {React.cloneElement(this.props.children, { 
                         
                    })}
                </form>

    }

}