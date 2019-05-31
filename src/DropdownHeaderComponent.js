import React, { Component } from 'react'
import DropdownArrow from './DropdownArrow';

const selectedMock = ["Test", "TestStory"];

export default class DropdownHeaderComponent extends Component {
    render() {
        return (
            <div className="dropdown-header">
                    <DropdownArrow toogle={this.props.toogle}/>
                    <span className="header-label">{this.props.name}</span>
                    <span className="selectedValues">{selectedMock.toString()}</span>
            </div>
        )
    }
}
