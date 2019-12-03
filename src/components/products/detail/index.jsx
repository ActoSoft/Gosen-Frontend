import React, { Component, Fragment } from 'react'
import { productsEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import CRUD from '../../../services'
import DetailReusable from './productDetailComponent'
import { Skeleton } from 'antd'
import { formatDate, validateExist } from '../../../utils'
// import WorksRelatedService from './worksRelated'
import ProductImages from './productImages'
import './index.scss'

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false
        }
        this.productId = this.props.match.params.id
    }

    componentDidMount() {
        CRUD.findOne(productsEndpoint, this.productId)
            .then(response =>
                this.setState({
                    data: response.data,
                    isReady: true
                }))
            .catch(error => console.log(error))
    }

    handleDelete = () => {
        if(window.confirm('¿Deseas realmente eliminar este producto?')) {
            CRUD.softDelete(productsEndpoint, this.serviceId)
                .then(response => {
                    console.log(response.data)
                    toast.success('El producto ha sido eliminado')
                    setTimeout(() => this.props.history.push('/productos/'), 3000)
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
                { label: 'Código de barras', value: validateExist(data.barcode) },
                { label: 'Descripción', value: validateExist(data.description) },
                { label: 'Fecha de creación', value: formatDate(data.created) },
                { label: 'Fecha de edición', value: formatDate(data.updated) },
            ]
        }
        return (
            <Fragment>
                <div className="body-container">
                    {
                        isReady ?
                            <div className="products-detail-container">
                                <DetailReusable
                                    data={data}
                                    editURL={pathname}
                                    handleDelete={this.handleDelete}
                                    attributes={attributes}
                                />
                                <ProductImages
                                    data={data.images}
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