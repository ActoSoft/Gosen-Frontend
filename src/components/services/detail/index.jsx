import React, { Component, Fragment } from 'react'
import { servicesEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import CRUD from '../../../services'
import DetailReusable from './serviceDetailComponent'
import { Skeleton } from 'antd'
import { formatDate, formatCosts } from '../../../utils'
import WorksRelatedService from './worksRelated'
import './index.scss'

export default class ServiceDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.serviceId = this.props.match.params.id
    }

    componentDidMount() {
        CRUD.findOne(servicesEndpoint, this.serviceId)
            .then(response =>
                this.setState({
                    data: response.data,
                    isReady: true
                }))
            .catch(error => console.log(error))
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente eliminar este servicio?')) {
            CRUD.softDelete(servicesEndpoint, this.serviceId)
                .then(response => {
                    console.log(response.data)
                    toast.success('El servicio ha sido eliminado')
                    setTimeout(() => this.props.history.push('/servicios/'), 3000)
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
        let attributes = []
        if(data) {
            attributes = [
                { label: 'Costo', value: formatCosts(data.cost) },
                { label: 'Descripción', value: data.description },
                { label: 'Tipo de Pago', value: data.payment_type },
                { label: 'Fecha de creación', value: formatDate(data.created) },
                { label: 'Fecha de edición', value: formatDate(data.updated) },
            ]
        }
        return (
            <Fragment>
                <div className="body-container">
                    {
                        isReady ?
                            <div className="service-detail-container">
                                <DetailReusable
                                    data={data}
                                    editURL={pathname}
                                    handleDelete={this.handleDelete}
                                    attributes={attributes}
                                />
                                <WorksRelatedService
                                    data={data.works}
                                />
                            </div>
                            :
                            <Skeleton active />
                    }
                </div>
            </Fragment>
        )
    }
}