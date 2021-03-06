import React, { Component } from 'react'
import { formatDate, validateExist, joinUserName } from '../../../utils'

export default class WorksRelatedService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actualIndex: 0,
            actualItem: null
        }
    }

    componentDidMount() {
        if(this.props.data) {
            this.renderItem(this.state.actualIndex)
        }
    }

    renderItem = (position) => {
        const { data } = this.props
        const length = data.length
        if (position < 0) position = length - 1
        if (position === length) position = 0
        this.setState({
            actualIndex: position,
            actualItem: data[position]
        })
    }

    render() {
        const { data } = this.props
        const { actualIndex, actualItem } = this.state

        return(
            <div className="service-detail-works">
                <p className="works-title">Trabajos vinculados</p>
                { data && data.length > 0 && actualItem ?
                    <div>
                        <div className="container">
                            <p className="arrow" onClick={() => this.renderItem(actualIndex - 1)} >{'<'}</p>
                            <div className="card-container">
                                <p className="name">{validateExist(actualItem.service.name)}</p>
                                <p>{joinUserName(actualItem.client.user)}</p>
                                <p>{formatDate(actualItem.datetime_start)}</p>
                            </div>
                            <p className="arrow" onClick={() => this.renderItem(actualIndex + 1)} >{'>'}</p>
                        </div>
                        <p className="info-total-works">{`${actualIndex + 1} de ${data.length}`}</p>
                    </div>
                    : 
                    <p className="no-works">No hay trabajos vinculado
                    con este servicio</p>
                }
            </div>
        )
    }
}