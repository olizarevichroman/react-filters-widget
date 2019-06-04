import React, { Component } from 'react';

class DraggableButton extends Component {

    constructor(props)
    {
        super(props);

        this.isDragged = false;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.isDragged = false;
    }

    onMouseDown(pageX, pageY)
    {
        this.cursorX = pageX;
        this.cursorY = pageY;
        this.isDragged = true;

        document.onmousemove = this.onMouseMove;
    }

    onMouseMove(e)
    {
        if (this.isDragged)
            {
                let shiftX = e.pageX - this.cursorX;
                let shiftY = e.pageY - this.cursorY;
                this.cursorX = e.pageX;
                this.cursorY = e.pageY;
                this.props.shift(shiftX, shiftY);
            }
    }

    onMouseUp()
    {
        this.isDragged = false;

        document.onmousemove = null;
    }

    render() {
        return (
            <span className="fa fa-bars" 
            onMouseDown={(e) => this.onMouseDown(e.pageX, e.pageY)}
            onMouseUp={this.onMouseUp}
            onDragStart={(e) => e.preventDefault()}
            />
        );
    }
}

export default DraggableButton;
