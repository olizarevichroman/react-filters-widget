import React, { Component } from 'react';
import DropdownHeader from './DropdownHeader';
import filterDataStore from './Stores/FiltersDataStore';
import EventTypes from './Events/EventTypes';
import {toggleDropdown} from './Actions/Actions'

export default class Dropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            isDropdownOpened: filterDataStore.isDropdownOpened(this.props.name)
        };

        this.toggleContent = this.toggleContent.bind(this);
        this.handleDropdownToggled = this.handleDropdownToggled.bind(this);
    }

    componentWillMount()
    {
        filterDataStore.on(EventTypes.onDropdownToggled, this.handleDropdownToggled);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(EventTypes.onDropdownToggled, this.handleDropdownToggled);
    }

    toggleContent()
    {
        toggleDropdown(this.props.name);
    }

    handleDropdownToggled()
    {
        var currentState = filterDataStore.isDropdownOpened(this.props.name);

        if (currentState !== this.state.isDropdownOpened)
        {
            this.setState({
                isDropdownOpened: currentState
            })
        }
    }

    reducer(previous, current, index)
    {
        if (index === 0)
        {
            return current;
        }
        
        return `${previous}, ${current}`;
    }

    render() {

        var headerData = this.props.selectedValues.reduce(this.reducer, "");

        return (
            <div>
                <DropdownHeader
                    toggle = {this.toggleContent} 
                    name = {this.props.name}
                    data = {headerData}
                    isContentVisible = {this.state.isDropdownOpened}
                />
                {this.state.isDropdownOpened && this.props.children}
            </div>
        );
    }
}
