import React, { Component } from 'react'
import Checkbox from './Checkbox';

export default class ContentElement extends Component {

    render() {
        return (
            <div className="content-element-container">
                <Checkbox checked = {this.props.checked} onChange = {this.props.onChange}/>
                <span className = "content-element">{this.props.text}</span>
            </div>
        )
    }
}
