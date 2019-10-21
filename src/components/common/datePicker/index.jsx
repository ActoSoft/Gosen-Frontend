import React from 'react'
import { DatePicker } from 'antd'
import './index.scss'
import moment from 'moment'

const dateFormat = 'DD/MM/YYYY'

const DatePickerComponent = ( props ) =>
    <div className={`calendar-container 
        ${props.className ? props.className : ''}
    `}>
        <DatePicker
            defaultValue={
                moment(props.value, 'YYYY-MM-DD')
            }
            format={dateFormat}
            onChange={props.onChange}
        />
    </div>

export default DatePickerComponent