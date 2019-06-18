import React from 'react'
import './index.scss'

const MainButton = ( props ) =>(
    <button className="main-button">
        { props.text ? props.text : null }
    </button>
)

export default MainButton