import React, { Component } from 'react';
import FilterElement from './FilterElement';
import * as actions from './Actions/Actions'
import FilterElementsWrapper from './FilterElementsWrapper';
import filterDataStore from './Stores/FiltersDataStore';
import EventTypes from './Events/EventTypes';

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

    onFilterSelected(filterType)
    {
        if (this.state.activeFilter.filterType === filterType)
        {
            actions.toggleSelect();
        }
        else
        {
            actions.toggleFilter(filterType);
        }
    }

    componentWillMount()
    {
        filterDataStore.on(EventTypes.onSelectToggled, this.handleSelectToggled);
        filterDataStore.on(EventTypes.onFilterChanged, this.handleFilterChanged);
        filterDataStore.on(EventTypes.onSortToggled, this.handleSortToggled);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(EventTypes.onSelectToggled, this.handleSelectToggled);
        filterDataStore.removeListener(EventTypes.onFilterChanged, this.handleFilterChanged);
        filterDataStore.removeListener(EventTypes.onSortToggled, this.handleSortToggled);
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
                                filterType = {value.filterType}
                                onClick = {() => this.onFilterSelected(value.filterType)}
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
