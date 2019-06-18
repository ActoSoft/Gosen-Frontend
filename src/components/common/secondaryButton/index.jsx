import React from 'react'
import './index.scss'

const SecondaryButton = ( props ) =>(
    <button className="secondary-button">
        { props.text ? props.text : null }
    </button>
)

export default SecondaryButton