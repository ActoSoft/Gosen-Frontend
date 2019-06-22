import React, { Component } from 'react'
import './index.scss'
import { Select } from 'antd'

class MultipleSelect extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    handleChange = (value) =>{
        console.log(`selected ${value}`);
    }

    render(){
        const { Option } = Select
        const children = []
        if(this.props.options){
            for (let i = 0; i < this.props.options.length; i++) {
                children.push(<Option key={this.props.options[i]}>{this.props.options[i]}</Option>)
            }
        }
        return(
            <Select
                mode="multiple"
                placeholder="Selecciona"
                onChange={this.handleChange}
                >
                {children}
            </Select>
        )
    }
}

export default MultipleSelect