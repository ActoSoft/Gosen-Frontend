import React, { Component } from 'react'
import './index.scss'
import { Radio } from 'antd'

class RadioButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: 1
        }
    }
    onChange = (e) =>{
        console.log('radio checked', e.target.value)
        this.setState({
            value: e.target.value,
        })
    }

    render(){
        return(
            <Radio.Group value={this.state.value} onChange={this.onChange} className="radio-container">
                {this.props.options ?
                    this.props.options.map((option, index)=>
                        <Radio
                            key={index}
                            className="radio-option"
                            value={option}
                        >
                            {option}
                        </Radio>
                    )
                    :
                    null
                }
            </Radio.Group>
        )
    }
}


export default RadioButton