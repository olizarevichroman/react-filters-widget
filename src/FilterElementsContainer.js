import React, { Component } from 'react';
import FilterElement from './FilterElement';
import * as actions from './Actions/Actions'
import FilterElementsWrapper from './FilterElementsWrapper';
import filterDataStore from './Stores/FiltersDataStore';

class FilterElementsContainer extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            filters: filterDataStore.getFilters()
        }
    }



    render() {
        return (
            <div className="filter-elements-container-after">
                <div className="filter-elements-container">
                    <FilterElementsWrapper>
                        {filterDataStore.getFilters().map((value, index) =>
                            <FilterElement
                                label = {value.label}
                                key = {index}
                                index = {value.index}/>
                        )}
                    </FilterElementsWrapper>

                    <FilterElementsWrapper>
                        <FilterElement onActive={() => actions.applySort()} onInactive={() => actions.cancelSort()} label="A-Z"/>
                    </FilterElementsWrapper>
                    
                </div>
            </div>
        );
    }
}

export default FilterElementsContainer;
