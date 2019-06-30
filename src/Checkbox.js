import React, { Component } from 'react';

export default class Checkbox extends Component {
    render() {
        return (
            <input type="checkbox"
                    checked = {this.props.checked}
                    onChange = {this.props.onChange}/>
        );
    }
}