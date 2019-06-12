import React, { Component } from 'react';
import DropdownHeader from './DropdownHeader';

class Dropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            isContentVisible: false
        };

        this.toggleContent = this.toggleContent.bind(this);
    }

    toggleContent()
    {
        this.setState(prev => ({
            isContentVisible: !prev.isContentVisible
        }))
    }

    reducer(previous, current, index)
    {
        if (index === 0)
        {
            return current;
        }
        
        return `${previous}, ${current}`;
    }

    render() {

        var headerData = this.props.selectedValues.reduce(this.reducer, "");

        return (
            <div>
                <DropdownHeader
                    toogle = {this.toggleContent} 
                    name = {this.props.name}
                    data = {headerData}
                    isContentVisible = {this.state.isContentVisible}
                />

                {this.state.isContentVisible && this.props.children}
            </div>
        );
    }
}

export default Dropdown;
