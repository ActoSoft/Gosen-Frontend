import React from 'react'
import './index.scss'

const TitleText = ( props ) =>
    <span className="title-text">{props.text ? props.text : null}</span>

export default TitleText