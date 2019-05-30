import React, { Component } from 'react'
import Dropdown from './Dropdown';

export default class DropdownsContainer extends Component {
    render() {
        return (
            <div className="dropdowns-container">
                <Dropdown/>
                <Dropdown/>
                <Dropdown/>
            </div>
        )
    }
}
