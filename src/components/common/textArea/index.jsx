import React from 'react'
import './index.scss'
import { Input } from 'antd'

const TextAreaComponent = ( props ) =>{
    const { TextArea } = Input
    return(
        <TextArea
            className={`text-area-component ${props.className ? props.className : null}`}
            onChange={props.onChange}
            value={props.value}
        />
    )
}

export default TextAreaComponent