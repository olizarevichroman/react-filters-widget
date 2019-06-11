import React, { Component } from 'react'
import DropdownHeaderComponent from './DropdownHeader';

export default class Dropdown extends Component {

    constructor(props)
    {
        super(props);
        this.state = { isVisible: false}

        this.toogleDropdown = this.toogleDropdown.bind(this);
    }

    toogleDropdown()
    {
        this.setState((prev) => ({ isVisible: !prev.isVisible }))
    };
    
    render() {

        return (
            <div>
                {this.props.header}
                {this.state.isVisible && this.props.children}
            </div>
        )
    }
}
