import React, { Component } from 'react'

export default class DropdownContent extends Component 
{

    render() {
        return (
            <div className = "dropdown-content-container">
                <ul className = "dropdown-content scrollable"> 
                    {this.props.children}
                </ul>
            </div>
        )
    }
}
