import React, { Component } from 'react';


class FilterElementsWrapper extends Component {

    render() {
        return (
            <div className="filter-elements-wrapper">
                {this.props.children}
            </div>
        );
    }
}

export default FilterElementsWrapper;
