import React, { Component } from 'react'
import DraggableButton from './DraggableButton'
import FilterWidgetHeaderToogleButton from './FilterWidgetHeaderToogleButton';

export default class FiltersWidgetHeader extends Component {
    render() {
        return (
            <div className="filtersWidgetHeader">
                <DraggableButton shift={this.props.shift}/>
                <span className="header-label">FILTERS</span>
                <FilterWidgetHeaderToogleButton isContentVisible = {this.props.isContentVisible} toogleContent = {this.props.toogleContent}/>
            </div>
        )
    }
}
