import React, { Component, Fragment } from 'react'
import { stocksEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import CRUD from '../../../services'
import DetailReusable from './stockDetailComponent'
import { Skeleton } from 'antd'
import { formatDate, validateExist } from '../../../utils'
import StockProducts from './stockProducts'
import './index.scss'

export default class StockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false,
            firstProduct: 0,
            lastProduct: 2
        }
        this.stockId = this.props.match.params.id
    }

    componentDidMount() {
        CRUD.findOne(stocksEndpoint, this.stockId)
            .then(response =>
                this.setState({
                    data: response.data,
                    isReady: true
                }))
            .catch(error => console.log(error))
    }

    handleDelete = () => {
        CRUD.softDelete(stocksEndpoint, this.stockId)
            .then(response => {
                console.log(response.data)
                toast.success('El almacén ha sido eliminado')
                setTimeout(() => this.props.history.push('/almacenes/'), 3000)
            })
            .catch(error => {
                console.log(error.response)
                toast.error('Algo fallo al eliminar')
            })
    }

    isLeftArrowProductShow = () => {
        const { firstProduct, data } = this.state
        const { products } = data
        // eslint-disable-next-line
        if (firstProduct < 1 || products && data.length < 3)  return false
        return true
    }

    isRightArrowProductShow = () => {
        const { lastProduct, data } = this.state
        const { products } = data
        // eslint-disable-next-line
        if (lastProduct === products.length - 1 || products && products.length < 3)  return false
        return true
    }


    handleMoveProduct = arrowClicked => {
        let { firstProduct, lastProduct } = this.state
        switch (arrowClicked) {
        case 'left':
            firstProduct -= 1
            lastProduct -= 1
            break
        case 'right':
            firstProduct += 1
            lastProduct += 1
            break
        default:
            console.log('Algo está fallando')
            break
        }
        this.setState({
            firstProduct,
            lastProduct
        })
    }


    render() {
        const { data, isReady, firstProduct, lastProduct } = this.state
        const { pathname } = this.props.location
        let attributes = []
        if(data) {
            attributes = [
                { label: 'Dirección', value: validateExist(data.name) },
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
                            <div className="stock-detail-container">
                                <DetailReusable
                                    data={data}
                                    editURL={pathname}
                                    handleDelete={this.handleDelete}
                                    attributes={attributes}
                                />
                                <StockProducts
                                    data={data.products}
                                    firstProduct={firstProduct}
                                    lastProduct={lastProduct}
                                    handleMoveProduct={this.handleMoveProduct}
                                    isLeftArrowProductShow={this.isLeftArrowProductShow}
                                    isRightArrowProductShow={this.isRightArrowProductShow}
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