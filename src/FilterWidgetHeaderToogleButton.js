import React, { Component } from 'react';

class FilterWidgetHeaderToogleButton extends Component {
    render() {

        var classNames = "fa open-close-thik ";

        classNames += this.props.isContentVisible ? "fa-close" : "fa-angle-down";

        return (
            <span className={classNames} onClick={this.props.toogleContent}></span>
        );
    }
}

export default FilterWidgetHeaderToogleButton;
