import React, { Component } from 'react';
import DropdownContent from './DropdownContent'
import filterDataStore from './Stores/FiltersDataStore'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'
import EventTypes from './Events/EventTypes'
import Dropdown from './Dropdown';

export default class TablesDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            tablesState: filterDataStore.getTables(),
            selectedTables: filterDataStore.getTables().filter(t => t.checked).map(t => t.tableName)
        };

        this.handleTablesChanged = this.handleTablesChanged.bind(this);
    }

    handleTablesChanged()
    {
        this.setState({
            tablesState: filterDataStore.getTables(),
            selectedTables: filterDataStore.getTables().filter(t => t.checked).map(t => t.tableName)
        })
    }

    componentWillMount()
    {
        filterDataStore.on(EventTypes.onTablesChanged, this.handleTablesChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(EventTypes.onTablesChanged, this.handleTablesChanged);
    }

    render() {

        return (
            <Dropdown selectedValues = {this.state.selectedTables} name = "CONTEXTS">
                <DropdownContent>
                    {this.state.tablesState.map((value, index) => <ContentElement                 
                                key = {index}
                                text = {value.tableName}
                                checked = {value.checked}
                                onChange = {() => actions.toggleTable(value.tableName)}/>)}
                </DropdownContent>
            </Dropdown>
        );
    }
}
