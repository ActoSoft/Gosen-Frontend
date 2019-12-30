import React from 'react'
import './index.scss'

const MainButton = ( props ) =>
    <button
        className={`main-button ${props.className ? props.className : ''}`}
        onClick={props.onClick}
        disabled={props.disabled ? true : false}
    >
        { props.text ? props.text : null }
    </button>

export default MainButton