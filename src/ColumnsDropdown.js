import React, { Component } from 'react';
import filterDataStore from './Stores/FiltersDataStore'
import DropdownContent from './DropdownContent'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'
import eventTypes from './Events/EventTypes'
import Dropdown from './Dropdown';

class ColumnsDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            columnsState: filterDataStore.getColumns(),
            selectedColumns: filterDataStore.getColumns().filter(c => c.checked).map(c => c.columnName),
        }

        this.handleColumnsChanged = this.handleColumnsChanged.bind(this);
    }

    handleColumnsChanged()
    {
        this.setState({
            columnsState: filterDataStore.getColumns(),
            selectedColumns: filterDataStore.getColumns().filter(c => c.checked).map(c => c.columnName)
        })
    }

    componentWillMount()
    {
        filterDataStore.on(eventTypes.onColumnsChanged, this.handleColumnsChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(eventTypes.onColumnsChanged, this.handleColumnsChanged);
    }

    render() {
        return (
            <Dropdown name = "DIMENSIONS" selectedValues = {this.state.selectedColumns}>
                <DropdownContent>
                    {this.state.columnsState.map((value, index) => <ContentElement                 
                                key = {index}
                                text = {value.columnName}
                                checked = {value.checked}
                                onChange = {() => actions.toggleColumn(value.tableName, value.columnName)}/>)}
                </DropdownContent>
            </Dropdown>
        );
    }
}

export default ColumnsDropdown;
