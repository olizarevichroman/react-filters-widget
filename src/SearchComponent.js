import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import {setFilterValue} from './Actions/Actions'

class SearchComponent extends Component {

    constructor(props)
    {
        super(props);

        this.handleChange = debounce(setFilterValue, 250);
    }

    componentWillUnmount()
    {
        this.debouncedHandleChange.cancel();
    }

    render() {

        return (
            <div className="searchWrapper">
                <i className="fa fa-search"/>
                <input type = "text" 
                    maxLength = "40" 
                    placeholder = "Find" 
                    onChange = {(e) => this.handleChange(e.target.value)}
                />
            </div>
        );
    }
}

export default SearchComponent;
