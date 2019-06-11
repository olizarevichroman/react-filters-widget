import React, { Component } from 'react';
import DropdownHeader from './DropdownHeader';
import filterDataStore from './Stores/FiltersDataStore'
import DropdownContent from './DropdownContent'
import ContentElement from './ContentElement'
import * as actions from './Actions/Actions'
import eventTypes from './Events/EventTypes'

class ColumnsDropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            columnsState: filterDataStore.getColumns(),
            selectedColumns: filterDataStore.getColumns().filter(c => c.checked).map(c => c.columnName),
            isContentVisible: false
        }

        this.handleColumnsChanged = this.handleColumnsChanged.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
    }

    toggleContent()
    {
        this.setState(function(prev) {
            return {isContentVisible: !prev.isContentVisible};
        });
    }

    handleColumnsChanged()
    {
        this.setState({
            columnsState: filterDataStore.getColumns()
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
            <div>
                <DropdownHeader
                    toogle = {this.toggleContent} 
                    name = "DIMENSIONS"
                    selectedValues = {this.state.selectedColumns}
                />

                {this.state.isContentVisible && 
                    <DropdownContent>
                        {this.state.columnsState.map((value, index) => <ContentElement                 
                                    key = {index}
                                    text = {value.columnName}
                                    checked = {value.checked}
                                    onChange = {() => actions.toggleColumn(value.tableName, value.columnName)}/>)}
                    </DropdownContent>
                }
            </div>
        );
    }
}

export default ColumnsDropdown;
