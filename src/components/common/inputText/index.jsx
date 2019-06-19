import React from 'react'
import './index.scss'

const InputText = ( props ) =>(
    <input type={ props.type ? props.type : null } className="input-text-component"/>
)

export default InputText