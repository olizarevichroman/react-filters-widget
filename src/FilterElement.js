import React, { Component } from 'react';

class FilterElement extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <p className="filterElement text-wrapper">{this.props.label}</p>
        );
    }
}

export default FilterElement;
