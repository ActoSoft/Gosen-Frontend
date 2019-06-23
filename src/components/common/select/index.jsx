import React, { Component } from 'react'
import { Select, Icon, Divider } from 'antd'
import 'antd/dist/antd.css'
import './index.scss'

class SelectComponent extends Component{
    constructor( props ){
        super(props)
        this.state = {

        }
    }

    render(){
        const { Option } = Select
        return(
            <Select className="select-component">
                { this.props.options ? 
                this.props.options.map(( option )=>(
                    <Option value = {`${option}`}> {`$option`}</Option>
                ))
                :
                null }
            </Select>
        )
    }
}

export default SelectComponent