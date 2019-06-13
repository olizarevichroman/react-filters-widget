import React, { Component } from 'react';
import FilterElement from './FilterElement';
import filterDataStore from './Stores/FiltersDataStore'

class FilterElementsSelect extends Component {

    render() {
        return (
            <div className="filter-elements-select">
                {filterDataStore.getFilters().map((value, index) => 
                    <FilterElement 
                        label = {value.label}
                        index = {value.index}
                        key = {index}/>
                )}
            </div>
        );
    }
}

export default FilterElementsSelect;
