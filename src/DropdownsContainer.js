import React, { Component } from 'react'
import Dropdown from './Dropdown';
import filtersDataStore from './Stores/FiltersDataStore'
import * as actions from './Actions/Actions'

export default class DropdownsContainer extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            tables: filtersDataStore.getTables(),
            columns: filtersDataStore.getColumns()
        }
    }

    render() {
        return (
            <div className="dropdowns-container">
                <Dropdown onElementClicked = {actions.includeTable} data={this.state.tables} name="CONTEXTS"/>
                <Dropdown onElementClicked = {actions.includeColumn} data={this.state.columns} name="DIMENSIONS"/>
            </div>
        )
    }
}
