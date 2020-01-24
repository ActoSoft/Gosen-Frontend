import React, { Component } from 'react'
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

class WorkForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            model: 'Trabajo',
            clients: [],
            services: [],
            employees: [],
            newWorkId: 0,
            data: null,
            newWork: {
                client: null,
                service: null,
                employees: [],
                dateStart: null,
                dateEnd: null,
                qty: 0,
                status: null
            }
        }
    }

    async componentDidMount() {
        const [clients, services, employees] = await Promise.all([
            CRUD.findAll(clientsEndpoint),
            CRUD.findAll(servicesEndpoint),
            CRUD.findAll(employeesEndpoint)
        ])
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {}
            this.setState({
                clients: clients.data,
                services: services.data,
                employees: employees.data,
                data,
                isCreate: true
            })
        }
        else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el almacén a modificar')
            CRUD.findOne(worksEndpoint, id)
                .then(({ data }) => {
                    this.setState({
                        clients: clients.data,
                        services: services.data,
                        employees: employees.data,
                        data
                    })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información')
                })
        }
    }

    render() {
        const { data, clients, services, employees, isCreate } = this.state
        console.log(clients)
        return (
            <Form
                data={data}
                isCreate={isCreate}
                model='trabajo'
                goBack='/trabajos/'
                clients={clients}
                services={services}
                employees={employees}
            />
        )
    }
}

export default WorkForm