import React, { Component, Fragment } from 'react'
import CRUD from '../../../services'
import { employeesEndpoint } from '../../../utils/backendEndpoints'
import ReusableList from '../../reusables/list'
import { Skeleton } from 'antd'
export default class EmployeesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Nombre',
                    name: 'first_name',
                    // width: '50%'
                },
                {
                    title: 'Apellidos',
                    name: 'last_name'
                },
                {
                    title: 'Correo Electrónico',
                    name: 'email',
                    // width: '25%'
                },
                {
                    title: 'Usuario',
                    name: 'username',
                    // width: '25%'
                }
            ]
        }
    }

    componentDidMount = async () => {
        const response = await CRUD.findAll(employeesEndpoint)
        if(response.data) {
            // this.destructInfo(response.data)
            this.setState({ data: this.destructInfo(response.data), isReady: true })
        }
    }

    destructInfo = data => {
        return data.map(m => {
            // TODO: Remove nested objects
            //const dataWithOutObjects = Object.keys(m).filter(key => typeof m[key] !== 'object')
            //console.log(dataWithOutObjects)
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
                        title='Empleados'
                        URL='/empleados'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}