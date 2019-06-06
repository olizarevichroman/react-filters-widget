import React, { Component } from 'react';

class SearchComponent extends Component {

    //implement debounce for search

    render() {
        return (
            <div className="searchWrapper">
                <i className="fa fa-search"/>
                <input type="text"/>
            </div>
        );
    }
}

export default SearchComponent;
