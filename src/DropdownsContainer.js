import React, { Component } from 'react'
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
