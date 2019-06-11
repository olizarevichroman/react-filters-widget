import React, { Component } from 'react'

export default class ContentElement extends Component {

    constructor(props)
    {
        super(props);
    }

    //onClick={() => this.props.onClick(this.props.index)}


    render() {
        return (
            <div className="dropdown-element">
                <input type="checkbox"/>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
