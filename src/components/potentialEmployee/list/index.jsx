import React, { Component, Fragment } from 'react'
import CRUD from '../../../services'
import { potentialEmployeesEndpoint } from '../../../utils/backendEndpoints'
import ReusableList from '../../reusables/list'
import { Skeleton } from 'antd'
import { deconstructInfo } from '../../../utils'
import { getPotentialEmployeeRole } from '../../../consts'
export default class PotentialEmployeeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Tipo',
                    name: 'role',
                    // width: '25%'
                },
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
                }
            ]
        }
    }

    componentDidMount = async () => {
        const response = await CRUD.findAll(potentialEmployeesEndpoint)
        if(response.data) {
            const data = response.data.map(potentialEmployee => {
                potentialEmployee.role = getPotentialEmployeeRole(potentialEmployee.role)
                return potentialEmployee
            })
            this.setState({
                data: deconstructInfo(data),
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
                        title='Empleados Postulantes'
                        URL='/empleados-postulantes'
                        history={this.props.history}
                    />
                    :
                    <Skeleton active={true} />
                }
            </Fragment>
        )
    }

}