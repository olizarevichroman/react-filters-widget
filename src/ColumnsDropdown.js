import React, { Component } from 'react';
import Dropdown from './Dropdown';
import filterDataStore from './Stores/FiltersDataStore'
import DropdownContent from './DropdownContent'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'

class ColumnsDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { columnsState: filterDataStore.getColumns()}
        this.handleColumnsChanged = this.handleColumnsChanged.bind(this);
    }

    handleColumnsChanged()
    {
        this.setState({
            columnsState: filterDataStore.getColumns()
        })
    }

    render() {
        return (
            <Dropdown name="DIMENSIONS">
                <DropdownContent isVisible = {this.state.isVisible}>
                    {this.state.columnsState.map((value, index) => <ContentElement                 
                                key = {index}
                                text = {value.columnName}
                                checked = {value.checked}
                                onClick = {() => actions.toggleColumn(value.tableName, value.columnName)}/>)}
                </DropdownContent>
            </Dropdown>
        );
    }
}

export default ColumnsDropdown;
