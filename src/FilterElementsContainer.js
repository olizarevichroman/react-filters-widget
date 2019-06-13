import React, { Component } from 'react';
import FilterElement from './FilterElement';
import * as actions from './Actions/Actions'
import FilterElementsWrapper from './FilterElementsWrapper';
import filterDataStore from './Stores/FiltersDataStore';
import eventTypes from './Events/EventTypes';

class FilterElementsContainer extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            filters: filterDataStore.getFilters(),
            activeFilter: filterDataStore.activeFilter,
            isSelectOpened: filterDataStore.isSelectOpened
        }

        this.onSelectOpened = this.onSelectOpened.bind(this);
        this.handleSelectToggled = this.handleSelectToggled.bind(this);
        this.handleFilterChanged = this.handleFilterChanged.bind(this);
    }

    onFilterSelected(index)
    {
        if (this.state.activeFilter.index === index)
        {
            actions.toggleSelect();
        }
        else
        {
            actions.toggleFilter(index);
        }
    }

    componentWillMount()
    {
        filterDataStore.on(eventTypes.onSelectToggled, this.handleSelectToggled);
        filterDataStore.on(eventTypes.onFilterChanged, this.handleFilterChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(this.handleSelectToggled);
        filterDataStore.removeListener(this.handleFilterChanged);
    }

    handleSelectToggled()
    { 
        this.setState({
            isSelectOpened: filterDataStore.isSelectOpened
        })
    }

    handleFilterChanged()
    {
        this.setState({
            activeFilter: filterDataStore.activeFilter
        })
    }

    onSelectOpened()
    {
        actions.toggleSelect();
    }
    

    render() {

        return (         
            <div className="filter-elements-container-after">
                <div className="filter-elements-container">
                    <FilterElementsWrapper>
                        {this.state.isSelectOpened && filterDataStore.getFilters().map((value, index) =>
                            <FilterElement
                                label = {value.label}
                                key = {index}
                                index = {value.index}
                                onClick = {() => this.onFilterSelected(value.index)}/>
                        )}

                        {!this.state.isSelectOpened && <FilterElement
                                                            label = {this.state.activeFilter.label}
                                                            index = {this.state.activeFilter.label}
                                                            onClick = {this.onSelectOpened}
                                                            />}
                    </FilterElementsWrapper>

                    <FilterElementsWrapper>
                        <FilterElement  label="A-Z"/>
                    </FilterElementsWrapper>
                    
                </div>
            </div>
        );
    }
}

export default FilterElementsContainer;
