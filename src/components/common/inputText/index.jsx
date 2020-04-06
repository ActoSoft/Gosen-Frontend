import React from 'react'
import './index.scss'
import { Input } from 'antd'

const InputText = ( props ) =>
    <Input
        placeholder={ props.placeholder ? props.placeholder : '' }
        className={`input-text-component
            ${props.className ? props.className : ''}
        `}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled ? true : false}
    />

export default InputText