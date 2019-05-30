import React, { Component } from 'react'

const selectedMock = ["Test", "TestStory"];

export default class DropdownHeaderComponent extends Component {
    render() {
        return (
            <div className="dropdown-header" onClick={this.props.toogle}>
                    <span>Contexts</span>
                    <span className="selectedValues">{selectedMock.toString()}</span>
                </div>
        )
    }
}
