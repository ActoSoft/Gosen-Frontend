import React, { Component } from 'react'
import { TimePicker } from 'antd'
import './index.scss'

class TimePickerComponent extends Component {
    constructor( props ){
        super( props )
        this.state = {

        }
    }

    render(){
        const format = 'HH:mm'
        return(
            <TimePicker
            format={format} />
        )
    }
}

export default TimePickerComponent