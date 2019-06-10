import React, { Component } from 'react'

export default class ContentElementComponent extends Component {

    constructor(props)
    {
        super(props);
    }


    render() {
        return (
            <div className="dropdown-element">
                <input type="checkbox" defaultChecked={this.props.checked} onClick={() => this.props.onClick(this.props.index)}/>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
