import React, { Component } from 'react'
import Checkbox from './Checkbox';

export default class ContentElement extends Component {

    handleBubbleEvent(target)
    {
        if (target.localName === "input")
        {
            return;
        }

        this.props.onChange();
    }

    render() {
        return (
            <div className="content-element-container" onClick = {(e) => this.handleBubbleEvent(e.target)}>
                <Checkbox checked = {this.props.checked} onChange = {this.props.onChange}/>
                <span className = "content-element">{this.props.text}</span>
            </div>
        )
    }
}
