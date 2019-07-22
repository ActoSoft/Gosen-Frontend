import React from 'react'
import './index.scss'
import { Input } from 'antd'

const InputText = ( props ) =>
    <Input
        placeholder={ props.placeholder ? props.placeholder : '' }
        className="input-text-component"
        name={props.name}
        onChange={props.onChange}
    />

export default InputText