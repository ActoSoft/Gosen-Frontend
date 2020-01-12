import React, { Component } from 'react'
import { stocksEndpoint, productsEndpoint } from '../../../utils/backendEndpoints'
import { toast } from 'react-toastify'
import Form from './form'
import CRUD, { post } from '../../../services'
import UploadProducts from './uploadProducts'



class StockForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreate: false,
            isFormVisible: true,
            isProductsVisible: false,
            model: 'Almacén',
            stockProducts: [],
            products: [],
            allProducts: [],
            newStockId: 0,
            selectedProduct: null,
            newQty: 0
        }
    }

    async componentDidMount() {
        const productsResponse = await CRUD.findAll(productsEndpoint)
        const allProducts = productsResponse.data
        if (this.props.match.path.split('/').pop() === 'crear') {
            const data = {}
            this.setState({
                allProducts,
                products: allProducts,
                isCreate: true,
                data
            })
        } else {
            const id = this.props.match.params.id || null
            if (!id) toast.error('No se especificó el almacén a modificar')
            CRUD.findOne(stocksEndpoint, id)
                .then(({ data }) => {
                    const { products: stockProducts } = data
                    const products = this.excludeProductsOnStock(allProducts, stockProducts)
                    this.setState({
                        data,
                        allProducts,
                        products,
                        stockProducts: stockProducts.filter(product => !product.product.deleted),
                        newStockId: data.id
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
            let response
            if(isCreate) {
                response = await CRUD.create(stocksEndpoint, data)
            } else {
                delete data.works
                response = await CRUD.update(stocksEndpoint, data.id, data)
            }
            if (response.data) {
                toast.success(`Almacén ${isCreate ? 'creado' : 'editado'} con éxito`)
                this.setState({
                    isFormVisible: false,
                    isProductsVisible: true,
                    newStockId: response.data.id
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

    excludeProductsOnStock = (products, stockProducts) => {
        stockProducts = stockProducts.map(stockProduct => stockProduct.product)
        return products.map(stock => {
            let count = 0
            stockProducts.forEach(stockProduct => {
                if (stock.id === stockProduct.id) count += 1
            })
            if (count === 0) return stock
            return null
        }).filter(nuevo => nuevo !== null)
    }

    handleSelectNewProduct = name => {
        const { products } = this.state
        const selectedProduct = products.filter(product => product.name === name)[0]
        this.setState({ selectedProduct })
    }

    handleChangeNewQty = event => {
        this.setState({
            newQty: event.target.value
        })
    }

    handleSaveProductInStock = async () => {
        const {
            selectedProduct,
            newQty,
            allProducts,
            newStockId
        } = this.state

        const body = {
            product: selectedProduct.id,
            qty: parseInt(newQty),
            stock: newStockId
        }

        try {
            const response = await post(`${stocksEndpoint}save_product/`, body)

            if (response.data) {
                toast.success('Producto registrado en almacén con éxito')
                const stockProducts = response.data.products.filter(product => !product.product.deteled)
                this.setState({
                    products: this.excludeProductsOnStock(allProducts, stockProducts),
                    stockProducts,
                    selectedProduct: null,
                    newQty: 0
                })
            } else {
                toast.error('Algo falló al registrar el producto dentro del almacén')
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo falló al registrar el producto dentro del almacén')
        }
    }

    handleChangeQtyInRegisteredProduct = (qty, index) => {
        const { stockProducts } = this.state
        stockProducts[index].qty = qty
        this.setState({ stockProducts })
    }

    handleUpdateRegisteredProduct = async index => {
        const { stockProducts } = this.state
        const productToUpdate = stockProducts[index]
        const { id, qty } = productToUpdate
        const body = {
            id,
            qty: parseInt(qty)
        }
        try {
            const response = await post(`${stocksEndpoint}update_qty/`, body)
            if (response.data) {
                toast.success('Cantidad actualizada correctamente')
                stockProducts[index] = response.data
                this.setState({ stockProducts })
            } else {
                toast.error('Algo falló al actualizar la cantidad')
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo falló al actualizar la cantidad')
        }
    }

    deleteRegisteredProduct = async index => {
        if (window.confirm('¿Estás seguro de eliminar el producto en este stock?')) {
            const { stockProducts, allProducts } = this.state
            const productToDelete = stockProducts[index]
            const { id } = productToDelete

            try {
                const response = await post(`${stocksEndpoint}delete_product/`, { id })
                if (response.data) {
                    toast.success('Cantidad actualizada correctamente')
                    const stockProducts = response.data.products.filter(product => !product.product.deleted)
                    this.setState({
                        stocks: this.excludeProductsOnStock(allProducts, stockProducts),
                        stockProducts
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

    handleEvent = (event, params) => {
        const events = {
            handleChange: this.handleChangeForm,
            handleChangeSelect: this.handleChangeSelect,
            handleSubmit: this.handleDataSubmit
        }
        return events[event](params)
    }

    finishCreateStock = () => {
        this.props.history.push(`/almacenes/${this.state.newStockId}`)
    }

    render() {
        const {
            isCreate,
            isProductsVisible,
            isFormVisible,
            data,
            model,
            stockProducts,
            products,
            selectedProduct,
            newQty
        } = this.state
        console.log(model)
        return (
            <div className="body-container">
                <Form
                    isVisible={isFormVisible}
                    events={this.handleEvent}
                    isCreate={isCreate}
                    data={data}
                    model={model}
                    goBack='/almacenes/'
                />
                <UploadProducts
                    isProductsVisible={isProductsVisible}
                    products={products}
                    stockProducts={stockProducts}
                    newQty={newQty}
                    selectedProduct={selectedProduct}
                    finishCreateStock={this.finishCreateStock}
                    handleSelectNewProduct={this.handleSelectNewProduct}
                    handleChangeNewQty={this.handleChangeNewQty}
                    handleSaveProductInStock={this.handleSaveProductInStock}
                    handleChangeQtyInRegisteredProduct={this.handleChangeQtyInRegisteredProduct}
                    handleUpdateRegisteredProduct={this.handleUpdateRegisteredProduct}
                    deleteRegisteredProduct={this.deleteRegisteredProduct}
                />
            </div>
        )
    }
}

export default StockForm