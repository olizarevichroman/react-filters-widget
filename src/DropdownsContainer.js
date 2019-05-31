import React, { Component } from 'react'
import Dropdown from './Dropdown';
import FilterComponent from './FilterComponent';

export default class DropdownsContainer extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className="dropdowns-container">
                <Dropdown name="CONTEXTS"/>
                <Dropdown name="DIMENSIONS"/>
            </div>
        )
    }
}
