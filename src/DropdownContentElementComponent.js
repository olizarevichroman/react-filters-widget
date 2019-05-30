import React, { Component } from 'react'

export default class DropdownContentElementComponent extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className="dropdown-element">
                <input type="checkbox"/>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
