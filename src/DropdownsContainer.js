import React, { Component } from 'react'
import Dropdown from './Dropdown';
import filtersDataStore from './Stores/FiltersDataStore'
import * as actions from './Actions/Actions'
import TablesDropdown from './TablesDropdown';
import ColumnsDropdown from './ColumnsDropdown';

export default class DropdownsContainer extends Component {

    render() {
        return (
            <div className="dropdowns-container">
                <TablesDropdown/>
                <ColumnsDropdown/>
            </div>
        )
    }
}
