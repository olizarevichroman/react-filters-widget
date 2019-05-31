import React, { Component } from 'react';
import SearchComponent from './SearchComponent';
import FilterElementsContainer from './FilterElementsContainer';
import FilterResultComponent from './FilterResultComponent';



class FilterComponent extends Component {
    render() {
        return (
            <div className="filter-component">
                <SearchComponent/>
                <FilterElementsContainer/>
                <FilterResultComponent/>
            </div>
        );
    }
}

export default FilterComponent;
