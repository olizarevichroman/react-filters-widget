import React, { Component } from 'react';

class FilterElement extends Component {

    

    constructor(props)
    {
        super(props);

        this.isActive = false;
        this.onClick = this.onClick.bind(this);
        this.backgrounds = {active: "#7d7d78", inactive: "#383737"};
        this.state = {"background-color": this.backgrounds.inactive};
    }


    onClick()
    {
        this.isActive = !this.isActive;

        var background = this.isActive ? this.backgrounds.active : this.backgrounds.inactive;

        this.setState({"background-color": background});
    }

    render() {
        return (
            <p className="filter-element text-wrapper" style={{"background-color" : this.state["background-color"]}} onClick={this.onClick}>{this.props.label}</p>
        );
    }
}

export default FilterElement;
