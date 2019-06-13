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
            isSelectOpened: filterDataStore.isSelectOpened,
            isSortOn: filterDataStore.isSortOn
        }

        this.onSelectOpened = this.onSelectOpened.bind(this);
        this.toggleSort = this.toggleSort.bind(this);

        this.handleSelectToggled = this.handleSelectToggled.bind(this);
        this.handleFilterChanged = this.handleFilterChanged.bind(this);
        this.handleSortToggled = this.handleSortToggled.bind(this);
    }

    toggleSort()
    {
        actions.toggleSort();
    }

    handleSortToggled()
    {
        this.setState({
            isSortOn: filterDataStore.isSortOn
        })
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
        filterDataStore.on(eventTypes.onSortToggled, this.handleSortToggled);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(eventTypes.onSelectToggled, this.handleSelectToggled);
        filterDataStore.removeListener(eventTypes.onFilterChanged, this.handleFilterChanged);
        filterDataStore.removeListener(eventTypes.onSortToggled, this.handleSortToggled);
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
                                onClick = {() => this.onFilterSelected(value.index)}
                                active = {value.active}/>
                        )}

                        {!this.state.isSelectOpened && <FilterElement
                                                            label = {this.state.activeFilter.label}
                                                            index = {this.state.activeFilter.label}
                                                            onClick = {this.onSelectOpened}
                                                            active = {true}
                                                            />}
                    </FilterElementsWrapper>

                    <FilterElementsWrapper>
                        <FilterElement  
                            label="A-Z"
                            active = {this.state.isSortOn}
                            onClick = {this.toggleSort}/>
                    </FilterElementsWrapper>
                    
                </div>
            </div>
        );
    }
}

export default FilterElementsContainer;
