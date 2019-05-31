import React, { Component } from 'react'

export default class FiltersWidgetHeader extends Component {
    render() {
        return (
            <div className="filtersWidgetHeader">
                <span className="header-label">FILTERS</span>
                <span className="fa fa-close close-thik" onClick={this.props.toogleContent}></span>
            </div>
        )
    }
}
