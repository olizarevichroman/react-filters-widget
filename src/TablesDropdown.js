import React, { Component } from 'react';
import DropdownContent from './DropdownContent'
import filterDataStore from './Stores/FiltersDataStore'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'
import eventTypes from './Events/EventTypes'
import DropdownHeader from './DropdownHeader'

class TablesDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            tablesState: filterDataStore.getTables(),
            isContentVisible: false
        };

        this.handleTablesChanged = this.handleTablesChanged.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
    }

    handleTablesChanged()
    {
        this.setState({
            tablesState: filterDataStore.getTables()
        })
    }

    componentWillMount()
    {
        filterDataStore.on(eventTypes.onTablesChanged, this.handleTablesChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(eventTypes.onTablesChanged, this.handleTablesChanged);
    }

    toggleContent()
    {
        this.setState(prev => ({
            isContentVisible: !prev.isContentVisible
        }))
    }

    render() {

        return (
            <div>
                <DropdownHeader
                    toogle = {this.toggleContent} 
                    name = "CONTEXTS"
                    selectedValues = {this.state.selectedTables}
                    isContentVisible = {this.state.isContentVisible}
                />

                {this.state.isContentVisible && 
                    <DropdownContent>
                        {this.state.tablesState.map((value, index) => <ContentElement                 
                                    key = {index}
                                    text = {value.tableName}
                                    checked = {value.checked}
                                    onChange = {() => actions.toggleTable(value.tableName)}/>)}
                </DropdownContent>}
            </div>
        );
    }
}

export default TablesDropdown;
