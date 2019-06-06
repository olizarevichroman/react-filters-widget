import React, { Component } from 'react'
import DropdownHeaderComponent from './DropdownHeaderComponent';
import DropdownContentComponent from './DropdownContentComponent';

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
                <DropdownHeaderComponent toogle={this.toogleDropdown} name={this.props.name}/>
                <DropdownContentComponent data={this.props.data} isVisible={this.state.isVisible}/>
            </div>
        )
    }
}
