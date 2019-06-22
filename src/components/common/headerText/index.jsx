import React from 'react'
import './index.scss'

const HeaderText = ( props ) =>(
    <h1 className="header-text">{ props.text ? props.text : null }</h1>
)

export default HeaderText

