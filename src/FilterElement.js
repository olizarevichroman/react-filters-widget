import React, { Component } from 'react';

class FilterElement extends Component {

    

    constructor(props)
    {
        super(props);

        this.isActive = false;
        this.onClick = this.onClick.bind(this);
        this.backgrounds = {active: "#7d7d78", inactive: "#383737"};
        this.state = {"backgroundColor": this.backgrounds.inactive};
    }

    //also here should be some logic to provide a filter function, which will be applied immediately after filter is swithed to active
    onClick()
    {
        this.isActive = !this.isActive;

        var background = this.isActive ? this.backgrounds.active : this.backgrounds.inactive;

        this.setState({"backgroundColor": background});

        var func = this.isActive ? this.props.onActive : this.props.onInactive;

        func();
    }

    render() {
        return (
            <p className="filter-element text-wrapper" style={{"backgroundColor" : this.state["backgroundColor"]}} onClick={this.onClick}>{this.props.label}</p>
        );
    }
}

export default FilterElement;
