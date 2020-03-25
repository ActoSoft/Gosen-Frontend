import React, { Component, Fragment } from 'react'
import {
    worksEndpoint,
    clientsEndpoint,
    servicesEndpoint,
    employeesEndpoint
} from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import { getDifferenceBetweenTwoArrays } from '../../../utils'
import CRUD, { post } from '../../../services'
import Form from './form'
import './index.scss'
import moment from 'moment'
import { Skeleton } from 'antd'
import { statuses, getWorkStatusByValue } from '../../../consts'

class WorkForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            isReady: false,
            model: 'Trabajo',
            clients: [],
            services: [],
            employees: [],
            statusItems: [],
            newWorkId: 0,
            data: null,
            work: null
        }
    }

    async componentDidMount() {
        const dateStart = moment().format('YYYY-MM-DD')
        const dateEnd = moment().add(1, 'days').format('YYYY-MM-DD')
        const [clients, services, employees] = await Promise.all([
            CRUD.findAll(clientsEndpoint),
            CRUD.findAll(servicesEndpoint),
            CRUD.findAll(employeesEndpoint)
        ])
        if (this.props.match.path.split('/').pop() === 'crear') {
            const work = {
                dateStart,
                dateEnd,
                description: '',
                qty: 0,
                total: 0,
                payed: 0,
                toPay: 0,
                employees: [],
                employeesId: []
            }
            this.setState({
                clients: clients.data,
                services: services.data,
                employees: employees.data,
                work,
                data: {},
                isCreate: true,
                isReady: true
            })
        }
        else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el almacén a modificar')
            const statusItems = Object.values(statuses)
            CRUD.findOne(worksEndpoint, id)
                .then(({ data }) => {
                    const work = {
                        id: data.id,
                        client: data.client,
                        clientId: data.client.id,
                        service: data.service,
                        serviceId: data.service.id,
                        employees: data.employees.map(({employee}) => employee),
                        employeesId: data.employees.map(({employee}) => employee.id),
                        dateStart: data.datetime_start,
                        dateEnd: data.datetime_end,
                        qty: data.qty,
                        total: data.total,
                        description: data.description,
                        payed: data.payed,
                        toPay: data.to_pay,
                        status: data.status,
                        newEmployees: [],
                        removedEmployees: [],
                    }
                    this.setState({
                        clients: clients.data,
                        services: services.data,
                        employees: employees.data,
                        statusItems,
                        data,
                        work,
                        isReady: true
                    })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información')
                })
        }
        // this.makeCalculations()
    }

    makeCalculations = () => {
        const { work } = this.state
        if (work.qty && work.service) {
            work.total = parseInt(work.qty) * parseFloat(work.service.cost)
            this.setState({ work })
        }

        if (work.total && work.payed) {
            work.toPay = parseFloat(work.total) - parseFloat(work.payed)
            work.payed = parseFloat(work.payed)
            this.setState({ work })
        }
    }

    handleChangeClient = ({ id }) => {
        const { work, clients } = this.state
        const selectedClient = clients.filter(client => client.id === id)[0]
        work.client = selectedClient
        work.clientId = selectedClient.id
        this.setState({
            work
        })
    }

    handleChangeService = ({ id }) => {
        const { work, services } = this.state
        const selectedService = services.filter(service => service.id === id)[0]
        work.service = selectedService
        work.serviceId = selectedService.id
        this.setState({
            work
        })
        this.makeCalculations()
    }

    handleChangeEmployees = ({ ids }) => {
        const { work } = this.state
        const { employeesId } = work
        if (ids.length > employeesId.length) {
            const addedId = getDifferenceBetweenTwoArrays(ids, employeesId)[0]
            this.addEmployee(addedId)
        } else if (ids.length < employeesId.length) {
            const removedId = getDifferenceBetweenTwoArrays(employeesId, ids)[0]
            this.removeEmployee(removedId)
        }
    }

    addEmployee = id => {
        const { employees, work, isCreate } = this.state
        const selectedEmployee = employees.filter(employee => employee.id === id)[0]
        work.employees.push(selectedEmployee)
        work.employeesId.push(id)
        if (!isCreate) work.newEmployees.push(id)
        this.setState({
            work,
        })
    }

    removeEmployee = id => {
        const { work, isCreate } = this.state
        const removedEmployeeId = work.employees.map(employee => employee.id).indexOf(id)
        work.employees.splice(removedEmployeeId, 1)
        work.employeesId = work.employees.map(employee => employee.id)
        if (!isCreate) work.removedEmployees.push(id)
        this.setState({
            work
        })
    }

    handleChangeInputText = ({target}) => {
        const { work } = this.state
        work[target.name] = target.value
        this.setState({
            work
        })
        this.makeCalculations()
    }

    handleChangeStatus = (status) => {
        const { work } = this.state
        work.status = getWorkStatusByValue(status)
        this.setState({ work })
    }

    handleChangeDatePicker = ({ name, moment }) => {
        const dateFormatted = moment.format('YYYY-MM-DD')
        const { work } = this.state
        work[name] = dateFormatted
        this.setState({ work })
    }

    handleChangeTextarea = ({ name, e }) => {
        const { work } = this.state
        work[name] = e.target.value
        this.setState({ work })
    }

    handleSubmit = async () => {
        const { work, isCreate } = this.state
        const {
            id,
            clientId,
            serviceId,
            employeesId,
            dateStart,
            dateEnd,
            description,
            qty,
            total,
            payed,
            toPay,
            status,
            newEmployees,
            removedEmployees
        } = work

        const body = {
            clientId,
            serviceId,
            employeesId,
            dateStart,
            dateEnd,
            description,
            qty: parseInt(qty),
            total,
            payed,
            toPay,
            status: isCreate ? 'authorized' : status,
            id: !isCreate ? id : null
        }

        const workId = this.props.match.params.id

        if (!isCreate) {
            body.newEmployees = getDifferenceBetweenTwoArrays(newEmployees, removedEmployees)
            body.removedEmployees = getDifferenceBetweenTwoArrays(removedEmployees, newEmployees)
        }
        try {
            let response
            if (isCreate) {
                response = await post(`${worksEndpoint}create_work/`, body)
            } else {
                response = await post(`${worksEndpoint}update_work/`, body)
            }

            if (response.data) {
                toast.success(`Trabajo ${isCreate ? 'creado' : 'actualizado'} con éxito`)
                window.location.assign(`/trabajos/${workId}`)
            } else {
                toast.error(`Algo falló al ${isCreate ? 'crear' : 'actualizar'}. Intenta más tarde`)
            }
        } catch (error) {
            console.log(error)
            toast.error(`Algo falló al ${isCreate ? 'crear' : 'actualizar'}. Intenta más tarde`)
        }
    }

    handleEvent = (event, params) => {
        const events = {
            handleChangeClient: this.handleChangeClient,
            handleChangeService: this.handleChangeService,
            handleChangeEmployees: this.handleChangeEmployees,
            handleChangeInputText: this.handleChangeInputText,
            handleChangeStatus: this.handleChangeStatus,
            handleChangeDatePicker: this.handleChangeDatePicker,
            handleChangeTextarea: this.handleChangeTextarea,
            handleSubmit: this.handleSubmit
        }

        if(!events.hasOwnProperty(event)) return undefined
        return events[event](params)
    }

    render() {
        const {
            data,
            clients,
            services,
            employees,
            statusItems,
            isCreate,
            work,
            isReady
        } = this.state
        return (
            <Fragment>
                {
                    isReady ?
                        <Form
                            data={data}
                            isCreate={isCreate}
                            model='trabajo'
                            goBack='/trabajos/'
                            clients={clients}
                            services={services}
                            statusItems={statusItems}
                            employees={employees}
                            work={work}
                            events={this.handleEvent}
                        />
                        : <Skeleton true />
                }
            </Fragment>
        )
    }
}

export default WorkForm