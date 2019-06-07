import React, { Component } from 'react'
import * as actions from './Actions/Actions';

export default class ContentElementComponent extends Component {

    constructor(props)
    {
        super(props);
    }


    render() {
        return (
            <div className="dropdown-element">
                <input type="checkbox" checked={this.props.checked} onClick={() => this.props.onClick(this.props.index)}/>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
