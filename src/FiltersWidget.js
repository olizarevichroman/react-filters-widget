import React, { Component } from 'react'
import FiltersWidgetHeader from './FiltersWidgetHeader';
import FiltersWidgetContentContainer from './FiltersWidgetContentContainer';

export default class FiltersWidget extends Component {

    constructor(props)
    {
        super(props);

        this.state = {isContentVisible : false, left: 30, top: 40};
        this.toogleContent = this.toggleContent.bind(this);
        this.shift = this.shift.bind(this);
    }

    shift(shiftX, shiftY)
    {
        this.setState((prev) => ({top: prev.top + shiftY, left: prev.left + shiftX}));
    }
    

    toggleContent()
    {
        this.setState((prev) => ({isContentVisible : !prev.isContentVisible}));
    }

    render() {

        var content = <FiltersWidgetContentContainer isContentVisible={this.state.isContentVisible}/>;

        return (
            <div className="filtersWidget" style={{left: this.state.left, top: this.state.top}}>
                <FiltersWidgetHeader toogleContent={this.toogleContent} shift={this.shift} isContentVisible={this.state.isContentVisible}/>
                {this.state.isContentVisible && content}
            </div>
        )
    }
}
