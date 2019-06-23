import React from 'react'
import { Calendar } from 'antd'
import './index.scss'

const DatePicker = ( props ) =>(
    <div className="calendar-container" >
        <Calendar fullscreen={false} />
    </div>
)

export default DatePicker