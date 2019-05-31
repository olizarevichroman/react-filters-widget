import React, { Component } from 'react'
import FiltersWidgetHeader from './FiltersWidgetHeader';
import FiltersWidgetContentContainer from './FiltersWidgetContentContainer';

export default class FiltersWidget extends Component {

    constructor(props)
    {
        super(props);

        this.state = {isContentVisible : true};
        this.toogleContent = this.toggleContent.bind(this);
    }

    toggleContent()
    {
        this.setState((prev) => ({isContentVisible : !prev.isContentVisible}));
    }

    render() {
        return (
            <div className="filtersWidget">
                <FiltersWidgetHeader toogleContent={this.toogleContent}/>
                <FiltersWidgetContentContainer isContentVisible={this.state.isContentVisible}/>
            </div>
        )
    }
}
