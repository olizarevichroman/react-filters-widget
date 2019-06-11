import React, { Component } from 'react'
import Checkbox from './Checkbox';

export default class ContentElement extends Component {

    render() {
        return (
            <div className="dropdown-element">
                <Checkbox checked = {this.props.checked} onChange = {this.props.onChange}/>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
