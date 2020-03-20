import React, { Component, Fragment } from 'react'
import { potentialEmployeesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import DetailComponent from './DetailComponent'
import CRUD from '../../../services'
import { withAuth } from '../../../Authentication'

class PotentialEmployeeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.potentialEmployeeId = this.props.match.params.id
        this.isStaff = this.props.auth.isStaff
    }

    componentDidMount() {
        CRUD.findOne(potentialEmployeesEndpoint, this.potentialEmployeeId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    data: response.data,
                    isReady: true
                })
            }
            )
            .catch(error =>
                console.log(error)
            )
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente descartar a este empleado postulante?')) {
            CRUD.softDelete(potentialEmployeesEndpoint, this.potentialEmployeeId)
                .then(() => {
                    toast.success('El empleado postulante ha sido descartado')
                    setTimeout(() => this.props.history.push('/empleados-postulantes/'), 3000)
                })
                .catch(error => {
                    console.log(error.response)
                    toast.error('Algo fallo al descartar')
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
                        <DetailComponent
                            data={data}
                            editURL={pathname}
                            handleDelete={this.handleDelete}
                            isStaff={this.isStaff}
                        />
                        : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default withAuth(PotentialEmployeeDetail)