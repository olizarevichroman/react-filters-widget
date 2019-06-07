import React, { Component } from 'react'
import ContentElementComponent from './ContentElementComponent';
import filtersDataStore from './Stores/FiltersDataStore'
import * as actions from './Actions/Actions'


// this.props.elements will be used instead of mock
export default class DropdownContentComponent extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render() {
        var classNames = "dropdown-content-container";

        if (this.props.isVisible === false)
        {
            classNames += " inactive";
        }

        return (
            <div className={classNames}>
                <ul className="dropdown-content scrollable"> 
                    {this.props.data.map((value, index) => <ContentElementComponent                    
                            key={index}
                            text={value}
                            onClick = {this.props.onElementClicked}/>)}
                </ul>
            </div>
        )
    }
}
