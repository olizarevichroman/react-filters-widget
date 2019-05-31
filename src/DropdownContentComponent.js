import React, { Component } from 'react'
import ContentElementComponent from './ContentElementComponent';

const mock = ["Editor", "Test", "Test story", "Cross"];

// this.props.elements will be used instead of mock
export default class DropdownContentComponent extends Component {

    render() {
        var classNames = "dropdown-content";

        if (this.props.isVisible === false){
            classNames += " inactive";
        }

        return (
                <ul className={classNames}>
                    
                    {mock.map((value, index) => <ContentElementComponent 
                            
                            key={index} 
                            text={value} />)}
                </ul>   
        )
    }
}
