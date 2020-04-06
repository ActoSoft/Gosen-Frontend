import React, { Component, Fragment } from 'react'
import CRUD from '../../services'
import { adminsEndpoint } from '../../utils/backendEndpoints'
import ReusableList from '../reusables/list'
import { Skeleton } from 'antd'
import { deconstructInfo } from '../../utils' 
export default class AdminList extends Component {

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
        const response = await CRUD.findAll(adminsEndpoint)
        if(response.data) {
            // this.destructInfo(response.data)
            this.setState({ data: deconstructInfo(response.data), isReady: true })
        }
    }

    destructInfo = data => {
        return data.map(m => {
            m.user.userId = m.user.id
            delete m.user.id
            return {
                ...m,
                ...m.user
            }
        })
    }

    render() {
        const { columns, data, isReady } = this.state
        return (
            <Fragment>
                {isReady ?
                    <ReusableList
                        columns={columns}
                        data={data}
                        title='Administradores'
                        URL='/administradores'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}