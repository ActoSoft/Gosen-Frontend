import React from 'react'
import './index.scss'
import { Input } from 'antd'

const InputPassword = ( props ) =>(
    <Input.Password
        placeholder={ props.placeholder ? props.placeholder : '' }
        className="input-pass-component"
        onChange={props.onChange}
        name={props.name}
    />
)

export default InputPassword