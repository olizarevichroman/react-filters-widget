import React, { Component } from 'react';

class DropdownArrow extends Component {
    render() {
        var iconClassName = this.props.isContentVisible ? "fa-angle-up" : "fa-angle-down";
        
        return (
            <i className = {`fa ${iconClassName} dropdown-arrow`} onClick={this.props.toogle}></i>
        );
    }
}

export default DropdownArrow;
