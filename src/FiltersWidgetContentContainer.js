import React, { Component } from 'react';
import DropdownsContainer from './DropdownsContainer';
import FilterComponent from './FilterComponent';

class FiltersWidgetContentContainer extends Component {
    render() {
        var classNames = "widget-content-container";

        if (this.props.isContentVisible === false)
        {
            classNames += " inactive";
        }

        return (
            <div className={classNames}>
                <DropdownsContainer/>
                <FilterComponent/>
            </div>
        );
    }
}

export default FiltersWidgetContentContainer;
