import React from 'react'
import './index.scss'
import { Input } from 'antd'

const InputPassword = ( props ) =>(
    <Input.Password placeholder={ props.placeholder ? props.placeholder : "" } className="input-pass-component"/>
)

export default InputPassword