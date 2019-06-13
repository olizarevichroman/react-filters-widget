import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class SearchComponent extends Component {

    constructor(props)
    {
        super(props);

        this.debouncedHandleChange = debounce(this.handleChange, 250);
    }

    handleChange(value)
    {
        console.log(value);
    }

    componentWillUnmount()
    {
        this.debouncedHandleChange.cancel();
    }

    render() {

        return (
            <div className="searchWrapper">
                <i className="fa fa-search"/>
                <input type = "text" placeholder = "Find" onChange = {(e) => this.debouncedHandleChange(e.target.value)}/>
            </div>
        );
    }
}

export default SearchComponent;
