import React from 'react'
import './index.scss'

const MainButtonOutlined = ( props ) =>
    <button className="main-button-outlined">
        { props.text ? props.text : null }
    </button>

export default MainButtonOutlined