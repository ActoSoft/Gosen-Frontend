import React from 'react'
import './index.scss'
import { Checkbox } from 'antd'

const CheckBoxComponent = ( props ) =>
    <div className="check-box-container">
        {props.options ?
            props.options.map(( option, index )=>
                <Checkbox
                    key={index}
                    className="check-element"
                >
                    { option }
                </Checkbox>
            )
            :
            null
        }
    </div>

export default CheckBoxComponent