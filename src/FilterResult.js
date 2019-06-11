import React, { Component } from 'react';
import ContentElement from './ContentElement';
import filterDataStore from './Stores/FiltersDataStore'
import * as actions from './Actions/Actions'
import eventTypes from './Events/EventTypes';

class FilterResult extends Component {

    constructor(props)
    {
        super(props);

        this.state = {results: filterDataStore.getFilterResults()}

        this.onRecordClicked = this.onRecordClicked.bind(this);
        this.handleResultsChanged = this.handleResultsChanged.bind(this);
    }

    handleResultsChanged()
    {
        this.setState({
            results: filterDataStore.getFilterResults()
        });
    }

    componentWillMount()
    {
        filterDataStore.on(eventTypes.onResultsChanged, this.handleResultsChanged);
    }

    componentWillUnmount()
    {
        filterDataStore.removeListener(eventTypes.onResultsChanged, this.handleResultsChanged);
    }

    onRecordClicked(index)
    {
        actions.toggleRecord(index)
    }

    render() {
        return (
            <div className="filter-result-container scrollable">
                {this.state.results.map((rec, index) => <ContentElement text={rec.data} 
                    onClick={this.onRecordClicked} 
                    checked={rec.checked} 
                    key={index} 
                    index={rec.index}/>)}
            </div>
        );
    }
}

export default FilterResult;
