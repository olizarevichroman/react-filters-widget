import React, { Component } from 'react';

class DraggableButton extends Component {

    constructor(props)
    {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseDown = e =>
    {
        this.cursorX = e.pageX;
        this.cursorY = e.pageY;

        document.onmousemove = this.onMouseMove;
    }

    onMouseMove(e)
    {
        let shiftX = e.pageX - this.cursorX;
        let shiftY = e.pageY - this.cursorY;

        this.cursorX = e.pageX;
        this.cursorY = e.pageY;
        this.props.shift(shiftX, shiftY);
    }

    onMouseUp()
    {
        document.onmousemove = null;
    }

    render() {
        return (
            <span className="fa fa-bars" 
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            />
        );
    }
}

export default DraggableButton;
