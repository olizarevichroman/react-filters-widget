import React, { Component } from 'react';

export default class FilterElement extends Component {
    render() {
        return (
            <p className="filter-element text-wrapper"
                style={{"backgroundColor" : this.props.active ? "#575554" : "#383737"}}
                onClick={this.props.onClick}>{this.props.label}</p>
        );
    }
}
