import React, { Component } from 'react';
import FilterElementsSelect from './FilterElementsSelect';
import FilterElement from './FilterElement';
import * as actions from './Actions/Actions'

class FilterElementsContainer extends Component {
    render() {
        return (
            <div className="filter-elements-container-after">
                <div className="filter-elements-container">
                    <FilterElementsSelect/>
                    <FilterElement onActive={() => actions.applySort()} onInactive={() => actions.cancelSort()} label="A-Z"/>
                </div>
            </div>
        );
    }
}

export default FilterElementsContainer;
