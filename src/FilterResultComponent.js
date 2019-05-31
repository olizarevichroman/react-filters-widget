import React, { Component } from 'react';
import ContentElementComponent from './ContentElementComponent';

const mockResults = [
    "(All)", "Pre Roll", "Age Zero"
]

class FilterResultComponent extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className="filter-result-container">
                {mockResults.map((res, index) => <ContentElementComponent text={res} key={index}/>)}
            </div>
        );
    }
}

export default FilterResultComponent;
