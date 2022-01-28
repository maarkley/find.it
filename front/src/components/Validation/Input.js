import React from 'react'

export default class Input extends React.Component {

    constructor() {
        super()
        this.state = {
            field: '',
            value: '',
            valid: true,
        }
    }

    render() {

        let { type, name, validator, classes } = this.props

        return <input className={classes}
                      type={type} 
                      onChange={this.onChange.bind(this)} 
                      name={name} />


    }

    validate() {



    }

    onChange(e) {
        this.setState({
            ...this.state,
            value: e.target.value
        }, () => {
            this.props.onChange(this.state.value)        
        })
    }

}