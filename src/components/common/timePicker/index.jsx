import React, { Component } from 'react'
import { TimePicker, Switch } from 'antd'
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
            <div className="time-picker-container">
                <div className="time-container">
                    <TimePicker
                    format={format} />
                    <div className="format-container">
                        <span>Horas</span>
                        <span>Minutos</span>
                    </div>
                </div>
                <Switch
                checkedChildren="P.M."
                unCheckedChildren="A.M."/>
            </div>            
        )
    }
}

export default TimePickerComponent