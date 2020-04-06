import React from 'react'
import './index.scss'

const ThirdButton = ( props ) =>
    <button className="third-button">
        { props.text ? props.text : null }
    </button>

export default ThirdButton