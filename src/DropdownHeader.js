import React, { Component } from 'react'
import DropdownArrow from './DropdownArrow';

export default class DropdownHeader extends Component {

    render() {
        return (
            <div className="dropdown-header">
                    <DropdownArrow toogle={this.props.toogle} isContentVisible = {this.props.isContentVisible}/>
                    <span className="header-label">{this.props.name}</span>
                    <span className="selectedValues">{this.props.selectedValues}</span>
            </div>
        )
    }
}
