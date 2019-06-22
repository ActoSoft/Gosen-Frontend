import React from 'react'
import './index.scss'

const SubtitleOne = ( props ) =>(
    <span className="subtitle-one-text">{props.text ? props.text : null}</span>
)

export default SubtitleOne