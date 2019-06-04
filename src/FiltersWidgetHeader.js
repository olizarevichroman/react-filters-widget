import React, { Component } from 'react'
import DraggableButton from './DraggableButton'

export default class FiltersWidgetHeader extends Component {
    render() {
        return (
            <div className="filtersWidgetHeader">
                <DraggableButton shift={this.props.shift}/>
                <span className="header-label">FILTERS</span>
                <span className="fa fa-close close-thik" onClick={this.props.toogleContent}></span>
            </div>
        )
    }
}
