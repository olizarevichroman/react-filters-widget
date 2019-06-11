import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        return (
            <input type="checkbox"
                    checked = {this.props.checked}
                    onChange = {this.props.onChange}/>
        );
    }
}

export default Checkbox;
