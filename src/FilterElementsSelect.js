import React, { Component } from 'react';
import FilterElement from './FilterElement';

class FilterElementsSelect extends Component {

    render() {
        return (
            <div className="filter-elements-select">
                <FilterElement label="A-Z"/>
                <FilterElement label="A-Z"/>
                <FilterElement  label="A-Z"/>
            </div>
        );
    }
}

export default FilterElementsSelect;
