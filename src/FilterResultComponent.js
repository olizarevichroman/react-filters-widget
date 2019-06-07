import React, { Component } from 'react';
import ContentElementComponent from './ContentElementComponent';
import filterDataStore from './Stores/FiltersDataStore'
import * as actions from './Actions/Actions'


class FilterResultComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {results: filterDataStore.getFilterResults()}

        this.onRecordClicked = this.onRecordClicked.bind(this);
    }

    componentWillMount()
    {
        filterDataStore.on("onResultsChanged", () => this.setState({
            results: filterDataStore.getFilterResults()
        }))
    }

    onRecordClicked(index)
    {
        actions.toggleRecord(index)
    }

    render() {
        return (
            <div className="filter-result-container scrollable">
                {this.state.results.map((rec, index) => <ContentElementComponent text={rec.data} 
                    onClick={this.onRecordClicked} 
                    checked={rec.checked} 
                    key={index} 
                    index={rec.index}/>)}
            </div>
        );
    }
}

export default FilterResultComponent;
