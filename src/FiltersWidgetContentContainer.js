import React, { Component } from 'react';
import DropdownsContainer from './DropdownsContainer';
import FilterComponent from './FilterComponent';

export default class FiltersWidgetContentContainer extends Component {

    render() {
        return (
            <div className="widget-content-container">
                <DropdownsContainer/>
                <FilterComponent/>
            </div>
            
        );
    }
}
