import React, { Component } from 'react';
import ContentElementComponent from './ContentElementComponent';
import filterDataStore from './Stores/FiltersDataStore'


class FilterResultComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {results: filterDataStore.getFilterResults()}
    }

    componentWillMount()
    {
        filterDataStore.on("onResultsChanged", () => this.setState({
            results: filterDataStore.getFilterResults()
        }))
    }

    render() {
        return (
            <div className="filter-result-container scrollable">
                {this.state.results.map((res, index) => <ContentElementComponent text={res} key={index}/>)}
            </div>
        );
    }
}

export default FilterResultComponent;
