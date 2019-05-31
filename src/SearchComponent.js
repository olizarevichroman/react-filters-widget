import React, { Component } from 'react';

class SearchComponent extends Component {
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
