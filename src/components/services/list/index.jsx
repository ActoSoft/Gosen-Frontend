import React, { Component, Fragment } from 'react'
import CRUD from '../../../services'
import { servicesEndpoint } from '../../../utils/backendEndpoints'
import ReusableList from '../../reusables/list'
import { Skeleton } from 'antd'
import { deconstructInfo } from '../../../utils'
export default class ServicesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Nombre',
                    name: 'name'
                },
                {
                    title: 'Costo',
                    name: 'cost'
                },
                {
                    title: 'Descripción',
                    name: 'description'
                }
            ]
        }
    }

    componentDidMount = async () => {
        const response = await CRUD.findAll(servicesEndpoint)
        if(response.data) {
            // this.destructInfo(response.data)
            this.setState({ data: deconstructInfo(response.data), isReady: true })
        }
    }


    render() {
        const { columns, data, isReady } = this.state
        return (
            <Fragment>
                {isReady ?
                    <ReusableList
                        columns={columns}
                        data={data}
                        title='Servicios'
                        URL='/servicios'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}