import React, { Component } from 'react'
import { productsEndpoint, stocksEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import Form from './form'
import CRUD, { post } from '../../../services'
import UploadImages from './uploadImages'
import SetStocks from './setStocks'
import { validateRequest } from '../../../validators'

// import './index.scss'

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            isFormVisible: true,
            isImagesVisible: false,
            isStocksVisible: false,
            model: 'Producto',
            images: [],
            productStocks: [],
            allStocks: [],
            stocks: [],
            newProductId: 0,
            selectedStock: null,
            newQty: 0
        }
    }

    async componentDidMount() {
        const stocksResponse = await CRUD.findAll(stocksEndpoint)
        const allStocks = stocksResponse.data
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {}
            this.setState({
                allStocks,
                stocks: allStocks,
                isCreate: true,
                data
            })
        } else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el producto a modificar')
            CRUD.findOne(productsEndpoint, id)
                .then(({ data }) => {
                    let { images, stocks: productStocks } = data
                    productStocks = productStocks.filter(stock => !stock.stock.deleted)
                    const stocks = this.excludeStocksOnProduct(allStocks, productStocks)
                    this.setState({
                        data,
                        images,
                        productStocks: productStocks.filter(stock => !stock.stock.deleted),
                        allStocks,
                        stocks,
                        newProductId: data.id
                    })
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Algo falló al traer la información.')
                })
        }
    }

    handleChangeForm = ({ e }) => {
        const { name, value } = e.target
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }


    handleChangeSelect = ({ name, value }) => {
        const { data } = this.state
        data[name] = value
        this.setState({ data })
    }


    handleDataSubmit = async () => {
        // TODO: Validations
        const { data, isCreate } = this.state
        try {
            const validatorResult = await validateRequest('product', data)
            if (!validatorResult.error) {
                let response
                if(isCreate) {
                    response = await CRUD.create(productsEndpoint, data)
                } else {
                    delete data.works
                    response = await CRUD.update(productsEndpoint, data.id, data)
                }
                if (response.data) {
                    toast.success(`Producto ${isCreate ? 'creado' : 'editado'} con éxito`)
                    this.setState({
                        isFormVisible: false,
                        isImagesVisible: true,
                        newProductId: response.data.id
                    })
                } else {
                    toast.error('WTF')
                }
            } else {
                validatorResult.errors.forEach(errorMessage =>
                    toast.error(errorMessage)
                )
            }
            
        } catch (error) {
            const { data } = error.response
            console.log(data)
            // showErrors(data)
        }
    }

    handleSetStocks = async () => {
        this.setState({
            isImagesVisible: false,
            isStocksVisible: true
        })
    }

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeSelect: this.handleChangeSelect,
            handleSubmit: this.handleDataSubmit
        }
        return events[event](params)
    }

    handleUploadImage = async ({target}) => {
        let formData = new FormData()
        formData.append('id', this.state.newProductId)
        formData.append('image', target.files[0])
        try {
            const response = await post(
                `${productsEndpoint}upload_image/`,
                formData
            )

            if(response.data) {
                toast.success('Imagen agregada con éxito')
                this.setState({ images: response.data.images })
            } else {
                toast.error('No se pudo agregar imagen')
            }
        } catch(error) {
            toast.error('No se pudo agregar imagen')
        }
    }

    handleSimulateClick = () => {
        document.querySelector('#input-file-upload-image').click()
    }

    handleDeleteImage = async (id) => {
        try {
            const response = await post(
                `${productsEndpoint}delete_image/`,
                { id }
            )

            if (response.data) {
                toast.success('Imagen eliminada con éxito')
                this.setState({ images: response.data.images })
            } else {
                toast.error('No se pudo eliminar imagen')
            }
        } catch(error) {
            toast.error('No se pudo eliminar imagen')
        }
    }

    excludeStocksOnProduct = (stocks, productStocks) => {
        productStocks = productStocks.map(productStock => productStock.stock)
        return stocks.map(stock => {
            let count = 0
            productStocks.forEach(productStock => {
                if (stock.id === productStock.id) count += 1
            })
            if (count === 0) return stock
            return null
        }).filter(nuevo => nuevo !== null)
    }

    handleSelectNewStock = name => {
        const { stocks } = this.state
        const selectedStock = stocks.filter(stock => stock.name === name)[0]
        this.setState({ selectedStock })
    }

    handleChangeNewQty = event => {
        this.setState({
            newQty: event.target.value
        })
    }

    handleSaveProductInStock = async () => {
        const {
            selectedStock,
            newQty,
            allStocks,
            newProductId
        } = this.state

        const body = {
            stock: selectedStock.id,
            qty: parseInt(newQty),
            product: newProductId
        }

        try {
            const response = await post(`${productsEndpoint}save_stock/`, body)

            if (response.data) {
                toast.success('Producto registrado en almacén con éxito')
                const productStocks = response.data.stocks.filter(stock => !stock.stock.deleted)
                this.setState({
                    stocks: this.excludeStocksOnProduct(allStocks, productStocks),
                    productStocks,
                    selectedStock: null,
                    newQty: 0
                })
            } else {
                toast.error('Algo falló al registrar el producto dentro del almacén')
            }
        } catch (error) {
            toast.error('Algo falló al registrar el producto dentro del almacén')
        }
    }

    handleChangeQtyInRegisteredStock = (qty, index) => {
        const { productStocks } = this.state
        productStocks[index].qty = qty
        this.setState({ productStocks })
    }

    handleUpdateRegisteredStock = async index => {
        const { productStocks } = this.state
        const stockToUpdate = productStocks[index]
        const { id, qty } = stockToUpdate
        const body = {
            id,
            qty: parseInt(qty)
        }
        try {
            const response = await post(`${productsEndpoint}update_qty/`, body)
            if (response.data) {
                toast.success('Cantidad actualizada correctamente')
                productStocks[index] = response.data
                this.setState({ productStocks })
            } else {
                toast.error('Algo falló al actualizar la cantidad')
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo falló al actualizar la cantidad')
        }
    }

    deleteRegisteredStock = async index => {
        if (window.confirm('¿Estás seguro de eliminar el producto en este stock?')) {
            const { productStocks, allStocks } = this.state
            const stockToDelete = productStocks[index]
            const { id } = stockToDelete

            try {
                const response = await post(`${productsEndpoint}delete_stock/`, { id })
                if (response.data) {
                    toast.success('Cantidad actualizada correctamente')
                    const productStocks = response.data.stocks.filter(stock => !stock.stock.deleted)
                    this.setState({
                        stocks: this.excludeStocksOnProduct(allStocks, productStocks),
                        productStocks
                    })
                } else {
                    toast.error('Algo falló al eliminar el producto en el almacén')
                }
            } catch (error) {
                console.log(error)
                toast.error('Algo falló al eliminar el producto en el almacén')
            }
        }
    }

    finishCreateProduct = () => {
        this.props.history.push(`/productos/${this.state.newProductId}/`)
    }

    render() {
        const {
            isCreate,
            isFormVisible,
            isImagesVisible,
            isStocksVisible,
            data,
            model,
            images,
            stocks,
            productStocks,
            newProductId,
            selectedStock,
            newQty
        } = this.state
        return (
            <div className="body-container">
                <Form
                    isVisible={isFormVisible}
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                    goBack='/productos/'
                />
                <UploadImages
                    isImagesVisible={isImagesVisible}
                    images={images}
                    endpoint={productsEndpoint}
                    productId={newProductId}
                    handleUploadImage={this.handleUploadImage}
                    simulateClick={this.handleSimulateClick}
                    handleDeleteImage={this.handleDeleteImage}
                    handleSetStocks={this.handleSetStocks}
                />
                <SetStocks
                    isStocksVisible={isStocksVisible}
                    stocks={stocks}
                    productStocks={productStocks}
                    newQty={newQty}
                    selectedStock={selectedStock}
                    finishCreateProduct={this.finishCreateProduct}
                    handleSelectNewStock={this.handleSelectNewStock}
                    handleChangeNewQty={this.handleChangeNewQty}
                    handleSaveProductInStock={this.handleSaveProductInStock}
                    handleChangeQtyInRegisteredStock={this.handleChangeQtyInRegisteredStock}
                    handleUpdateRegisteredStock={this.handleUpdateRegisteredStock}
                    deleteRegisteredStock={this.deleteRegisteredStock}
                />
            </div>
        )
    }
}

export default ProductForm