import React, { Component, Fragment } from 'react'
import CRUD from '../../../services'
import { clientsEndpoint } from '../../../utils/backendEndpoints'
import ReusableList from '../../reusables/list'
import { Skeleton } from 'antd'
import { deconstructInfo } from '../../../utils'
export default class ClientList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Nombre',
                    name: 'userFirst_name',
                    // width: '50%'
                },
                {
                    title: 'Apellidos',
                    name: 'userLast_name'
                },
                {
                    title: 'Correo Electrónico',
                    name: 'userEmail',
                    // width: '25%'
                },
                {
                    title: 'Usuario',
                    name: 'userUsername',
                    // width: '25%'
                }
            ]
        }
    }

    componentDidMount = async () => {
        const response = await CRUD.findAll(clientsEndpoint)
        if(response.data) {
            this.setState({
                data: deconstructInfo(response.data),
                isReady: true
            })
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
                        title='Clientes'
                        URL='/clientes'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}