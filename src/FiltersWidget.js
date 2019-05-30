import React, { Component } from 'react'
import FiltersWidgetHeader from './FiltersWidgetHeader';
import DropdownsContainer from './DropdownsContainer';

export default class FiltersWidget extends Component {
    render() {
        return (
            <div className="filtersWidget">
                <FiltersWidgetHeader/>
                <DropdownsContainer/>
            </div>
        )
    }
}
