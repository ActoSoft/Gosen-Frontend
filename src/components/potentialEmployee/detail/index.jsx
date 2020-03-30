import React, { Component, Fragment } from 'react'
import { potentialEmployeesEndpoint, employeesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import DetailComponent from './DetailComponent'
import CRUD from '../../../services'
import moment from 'moment'
import { withAuth } from '../../../Authentication'

class PotentialEmployeeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false,
            isContracted: false
        }
        this.potentialEmployeeId = this.props.match.params.id
        this.isStaff = this.props.auth.isStaff
        this.adminId = this.props.auth.adminId
    }

    componentDidMount() {
        CRUD.findOne(potentialEmployeesEndpoint, this.potentialEmployeeId)
            .then(response => {
                const uname = response.data.user.username
                response.data.user.username = uname.replace('_potential', '')
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

    handleSubmit = async () => {
        // TODO: Validations
        const { data } = this.state
        delete data.photo
        try {
            if (!data.country) data.country = 'México'
            data.contracted_by = this.adminId
            const response = await CRUD.create(employeesEndpoint, data)

            if (response.data) {
                CRUD.softDelete(potentialEmployeesEndpoint, this.potentialEmployeeId)
                    .then(() => {
                        toast.success('Datos actualizados con éxito')
                        setTimeout(() => this.props.history.push(`/empleados/${response.data.id}/`), 3000)
                    })
                    .catch(error => {
                        console.log(error.response)
                        toast.error('Algo fallo al convertir postulante a empleado')
                    })
            } else {
                toast.error('WTF')
            }
        } catch (error) {
            const { data } = error.response
            console.log(data)
            // showErrors(data)
        }
    }

    handleContractEmployee = () => {
        this.setState({ isContracted: true })
    }

    handleDelete = () => {
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

    handleChange = ({ e }) => {
        const { data } = this.state
        data[e.target.name] = e.target.value
        this.setState({ data })
    }

    handleChangeDate = ({name, value}) => {
        const dateFormatted = moment(value).format('YYYY-MM-DD')
        const { data } = this.state
        data[name] = dateFormatted
        this.setState({ data })
    }

    handleChangeSelect = ({name, value}) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChange,
            handleChangeDate: this.handleChangeDate,
            handleChangeSelect: this.handleChangeSelect,
            handleSubmit: this.handleSubmit
        }
        return events[event](params)
    }

    render() {
        const { data, isReady, isContracted } = this.state
        const { pathname } = this.props.location
        return (
            <Fragment>
                <div className="body-container">
                    {isReady ?
                        <DetailComponent
                            data={data}
                            editURL={pathname}
                            handleDelete={this.handleDelete}
                            handleContractEmployee={this.handleContractEmployee}
                            isStaff={this.isStaff}
                            handleSubmit={this.handleSubmit}
                            isContracted={isContracted}
                            events={this.handleEvent}
                        />
                        : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default withAuth(PotentialEmployeeDetail)