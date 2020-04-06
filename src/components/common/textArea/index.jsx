import React from 'react'
import './index.scss'
import { Input } from 'antd'

const TextAreaComponent = ( props ) =>{
    const { TextArea } = Input
    return(
        <TextArea
            name={props.name}
            className={`text-area-component ${props.className ? props.className : null}`}
            onChange={props.onChange}
            placeholder={props.placeholder ? props.placeholder : null}
            value={props.value}
        />
    )
}

export default TextAreaComponent