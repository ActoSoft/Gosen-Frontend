import React from 'react'
import './index.scss'
import { Radio } from 'antd'

const RadioButton = (props) => {
    const { Group } = Radio
    return(
        <Group value={props.value}
            onChange={props.onChange}
            className={`radio-container
                ${props.className ? props.className : ''}
            `}
            name={props.name ? props.name : null}
        >
            {props.options ?
                props.options.map((option, index)=>
                    <Radio
                        key={index}
                        className="radio-option"
                        value={option.value}
                    >
                        {option.readable}
                    </Radio>
                )
                :
                null
            }
        </Group>
    )
}


export default RadioButton