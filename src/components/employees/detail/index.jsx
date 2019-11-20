import React, { Component, Fragment } from 'react'
import { employeesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import DetailReusable from '../../reusables/detail'
import CRUD from '../../../services'
import ContractDetail from './contractDetail'
import { withAuth } from '../../../Authentication'

class EmployeeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.adminId = this.props.match.params.id
        this.isStaff = this.props.auth.isStaff
    }

    componentDidMount() {
        CRUD.findOne(employeesEndpoint, this.adminId)
            .then(response =>
                this.setState({
                    data: response.data,
                    isReady: true
                })
            )
            .catch(error =>
                console.log(error)
            )
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente eliminar a este empleado?')) {
            CRUD.softDelete(employeesEndpoint, this.adminId)
                .then(response => {
                    console.log(response.data)
                    toast.success('El empleado ha sido eliminado')
                    setTimeout(() => this.props.history.push('/empleados/'), 3000)
                })
                .catch(error => {
                    console.log(error.response)
                    toast.error('Algo fallo al eliminar')
                })
        }
    }

    render() {
        const { data, isReady } = this.state
        const { pathname } = this.props.location
        return (
            <Fragment>
                <div className="body-container">
                    {isReady ?
                        <div className="profile-container">
                            <DetailReusable
                                data={data}
                                editURL={pathname}
                                handleDelete={this.handleDelete}
                                isStaff={this.isStaff}
                                notProfileContainer={true}
                            />
                            <ContractDetail
                                data={data}
                            />
                        </div>
                        : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default withAuth(EmployeeDetail)