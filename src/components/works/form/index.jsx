import React, { Component, Fragment } from 'react'
import {
    worksEndpoint,
    clientsEndpoint,
    servicesEndpoint,
    employeesEndpoint
} from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import CRUD, { post } from '../../../services'
import Form from './form'
import './index.scss'
import moment from 'moment'
import { Skeleton } from 'antd'

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
                toay: 0
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
            CRUD.findOne(worksEndpoint, id)
                .then(({ data }) => {
                    const work = {
                        client: data.client,
                        clientId: data.client.id,
                        service: data.service,
                        serviceId: data.service.id,
                        employees: data.employees,
                        employeesId: data.employees.map(employee => employee.id),
                        dateStart: data.datetime_start,
                        dateEnd: data.datetime_end,
                        qty: data.qty,
                        total: data.total,
                        payed: data.payed,
                        toPay: data.to_pay
                    }
                    this.setState({
                        clients: clients.data,
                        services: services.data,
                        employees: employees.data,
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
        this.makeCalculations()
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
        const { work, employees } = this.state
        const selectedEmployees = ids.map(id =>
            employees.filter(employee => employee.id === id)[0]
        )
        console.log(selectedEmployees)
        work.employees = selectedEmployees
        work.employeesId = ids
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
        const { work } = this.state
        const {
            clientId,
            serviceId,
            employeesId,
            dateStart,
            dateEnd,
            description,
            qty,
            total,
            payed,
            toPay
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
            toPay
        }
        try {
            const response = await post(`${worksEndpoint}create_work/`, body)

            if (response.data) {
                console.log(response.data)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEvent = (event, params) => {
        const events = {
            handleChangeClient: this.handleChangeClient,
            handleChangeService: this.handleChangeService,
            handleChangeEmployees: this.handleChangeEmployees,
            handleChangeInputText: this.handleChangeInputText,
            handleChangeDatePicker: this.handleChangeDatePicker,
            handleChangeTextarea: this.handleChangeTextarea,
            handleSubmit: this.handleSubmit
        }

        if(!events.hasOwnProperty(event)) return undefined
        return events[event](params)
    }

    render() {
        const { data, clients, services, employees, isCreate, work, isReady } = this.state
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