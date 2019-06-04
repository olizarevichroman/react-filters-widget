import React, { Component } from 'react';

class DropdownArrow extends Component {
    render() {
        return (
            <i className="fa fa-angle-down dropdown-arrow" onClick={this.props.toogle}></i>
        );
    }
}

export default DropdownArrow;
