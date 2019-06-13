import React, { Component } from 'react';

class FilterElement extends Component {

    constructor(props)
    {
        super(props);

        this.backgrounds = {active: "#595855", inactive: "#383737"};
        this.state = {"backgroundColor": this.backgrounds.inactive};
    }

    render() {
        return (
            <p className="filter-element text-wrapper"
                style={{"backgroundColor" : this.state["backgroundColor"]}}
                onClick={this.props.onClick}>{this.props.label}</p>
        );
    }
}

export default FilterElement;
