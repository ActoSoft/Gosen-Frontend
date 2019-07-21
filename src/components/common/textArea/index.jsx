import React from 'react'
import './index.scss'
import { Input } from 'antd'

const TextAreaComponent = ( props ) =>{
    const { TextArea } = Input
    return(
        <TextArea
            className="text-area-component"
            onChange={props.onChange}
        />
    )
}

export default TextAreaComponent