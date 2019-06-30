import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import {setFilterValue} from './Actions/Actions'
import filterDataStore from './Stores/FiltersDataStore';

export default class SearchComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {filterValue: filterDataStore.filterValue}
    }

    componentWillMount()
    {
        this.debouncedHandleChange = debounce(setFilterValue, 100);
        this.filterValue = filterDataStore.filterValue;
    }

    componentWillUnmount()
    {
        this.debouncedHandleChange.cancel();
    }

    handleChange(value)
    {
        this.setState({
            filterValue: value
        });

        this.debouncedHandleChange(value);
    }

    render() {

        return (
            <div className="searchWrapper">
                <i className="fa fa-search"/>
                <input type = "text" 
                    maxLength = "40" 
                    placeholder = "Find"
                    value = {this.state.filterValue} 
                    onChange = {(e) => this.handleChange(e.target.value)}
                />
            </div>
        );
    }
}
