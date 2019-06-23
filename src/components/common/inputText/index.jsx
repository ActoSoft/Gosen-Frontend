import React from 'react'
import './index.scss'
import { Input } from 'antd'

const InputText = ( props ) =>(
    <Input placeholder={ props.placeholder ? props.placeholder : "" } className="input-text-component"/>
)

export default InputText