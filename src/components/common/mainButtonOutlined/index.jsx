import React from 'react'
import './index.scss'

const MainButtonOutlined = ( props ) =>
    <button className="main-button-outlined" onClick={props.onClick ? props.onClick : null}>
        { props.text ? props.text : null }
    </button>

export default MainButtonOutlined