import React from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css'
import './index.scss'

const SelectComponent = (props) => {
    const { Option } = Select
    return(
        <Select
            className={`select-component
                ${props.className ? props.className : ''}`
            }
            name={props.name}
            mode={props.mode ? props.mode : null}
            onChange={props.onChange}
            defaultValue={props.value ? props.value : null}
            showSearch={props.searchable ? true : false}
            disabled={props.disabled ? true : false}
        >
            { props.options ?
                props.options.map((option, index) =>
                    <Option
                        key={index}
                        value = {`${option}`}
                    >
                        {option}
                    </Option>
                )
                :
                null }
        </Select>
    )
}

export default SelectComponent