import React, { Component, Fragment } from 'react'
import { productsEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import CRUD from '../../../services'
import DetailReusable from './productDetailComponent'
import { Skeleton } from 'antd'
import { formatDate, validateExist } from '../../../utils'
// import WorksRelatedService from './worksRelated'
import ProductStock from './productStock'
import ProductImages from './productImages'
import './index.scss'

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isReady: false,
            firstStock: 0,
            lastStock: 2
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
            CRUD.softDelete(productsEndpoint, this.productId)
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

    isLeftArrowStockShow = () => {
        const { firstStock, data } = this.state
        const { stocks } = data
        // eslint-disable-next-line
        if (firstStock < 1 || stocks && data.length < 3)  return false
        return true
    }

    isRightArrowStockShow = () => {
        const { lastStock, data } = this.state
        const { stocks } = data
        // eslint-disable-next-line
        if (lastStock === stocks.length - 1 || stocks && stocks.length < 3)  return false
        return true
    }

 
    handleMoveStock = arrowClicked => {
        let { firstStock, lastStock } = this.state
        switch (arrowClicked) {
        case 'left':
            firstStock -= 1
            lastStock -= 1    
            break
        case 'right':
            firstStock += 1
            lastStock += 1
            break
        default: 
            console.log('Algo está fallando')
            break
        }
        this.setState({
            firstStock,
            lastStock
        })
    }

    render() {
        const { data, isReady, firstStock, lastStock } = this.state
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
                                <div className="main-row">
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
                                <ProductStock
                                    data={data.stocks}
                                    firstStock={firstStock}
                                    lastStock={lastStock}
                                    handleMoveStocks={this.handleMoveStock}
                                    isLeftArrowStockShow={this.isLeftArrowStockShow}
                                    isRightArrowStockShow={this.isRightArrowStockShow}

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