import React, { Component } from 'react';
import Dropdown from './Dropdown';
import DropdownContent from './DropdownContent'
import filterDataStore from './Stores/FiltersDataStore'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'

class TablesDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { tablesState: filterDataStore.getTables()}
        this.handleTablesChanged = this.handleTablesChanged.bind(this);
    }

    handleTablesChanged()
    {
        this.setState({
            tablesState: filterDataStore.getTables()
        })
    }

    componentWillMount()
    {
        filterDataStore.on("onTablesChanged", this.handleTablesChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener("onTablesChanged", this.handleTablesChanged);
    }

    render() {
        return (
            <Dropdown name="CONTEXTS">
                <DropdownContent isVisible = {this.state.isVisible}>
                    {this.state.tablesState.map((value, index) => <ContentElement                 
                                key = {index}
                                text = {value.tableName}
                                checked = {value.checked}
                                onClick = {() => actions.toggleTable(value.tableName)}/>)}
                </DropdownContent>
            </Dropdown>
        );
    }
}

export default TablesDropdown;
