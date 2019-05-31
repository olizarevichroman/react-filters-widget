import React, { Component } from 'react';
import FilterElementsSelect from './FilterElementsSelect';
import FilterElement from './FilterElement';

class FilterElementsContainer extends Component {
    render() {
        return (
            <div className="filter-elements-container-after">
                <div className="filter-elements-container">
                    <FilterElementsSelect/>
                    <FilterElement label="A-Z"/>
                </div>
            </div>
        );
    }
}

export default FilterElementsContainer;
