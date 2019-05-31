import React, { Component } from 'react';
import FilterElement from './FilterElement';

var filterF = (arr) => arr;

const mockFilterElements = [
    {label: "''", filterFunction : filterF, isDefault: true}, 
    {label: "**", filterFunction : filterF},
    {label: "//", filterFunction : filterF}
]
//We can 

class FilterElementsSelect extends Component {

    constructor(props)
    {
        super(props);

        this.state = {...mockFilterElements[0]};
    }


    render() {
        return (
            <div className="filter-elements-select">
                <p className="text-wrapper">""</p>
            </div>
        );
    }
}

export default FilterElementsSelect;
