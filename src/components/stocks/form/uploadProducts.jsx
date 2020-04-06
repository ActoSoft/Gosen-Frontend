import React, { Fragment } from 'react'
import { Icon, Row, Col } from 'antd'
import MainButton from '../../common/mainButton'
import Select from '../../common/select'
import Input from '../../common/inputText'
import '../../products/form/index.scss'

const UploadProducts = ({
    finishCreateStock,
    products,
    stockProducts,
    newQty,
    handleSelectNewProduct,
    handleChangeNewQty,
    handleSaveProductInStock,
    handleChangeQtyInRegisteredProduct,
    handleUpdateRegisteredProduct,
    deleteRegisteredProduct,
    isProductsVisible,
    selectedProduct
}) =>
    <Fragment>
        { isProductsVisible ?
            <div className='profile-container service-container'>
                <div className="header-container services">
                    <div className="header-text-container-update">
                        <p className="label-images-create">Agrega productos al almacén</p>
                    </div>
                    <div className="buttons-service-form">
                        <MainButton
                            text='Finalizar'
                            className="edit-buttons"
                            onClick={() => finishCreateStock()}
                        />
                    </div>
                </div>
                <Row className="product-stocks-add-container">
                    <Col span={8} offset={1}>
                        <p>Selecciona un producto</p>
                        <Select
                            className='select-stock'
                            options={products.map(stock => stock.name)}
                            name="Productos"
                            onChange={value => handleSelectNewProduct(value)}
                            searchable={true}
                        />
                    </Col>
                    <Col span={8} offset={1}>
                        <p>Indica la cantidad a guardar</p>
                        <Input
                            className='qty-stock'
                            placeholder='Cantidad'
                            value={newQty}
                            onChange={e => handleChangeNewQty(e)}
                            disabled={selectedProduct ? false : true}
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <MainButton
                            text='Guardar producto en almacén'
                            disabled={selectedProduct ? false : true}
                            onClick={() => handleSaveProductInStock()}
                        />
                    </Col>
                </Row>
                <Row className="product-stocks-existing-container">
                    <p className="label-stocks-registered">Productos existentes</p>
                    {stockProducts ?
                        stockProducts.map((stock, index) =>
                            <Col
                                span={5}
                                offset={1}
                                key={stock.product.id}
                            >
                                <StockRegistered
                                    stock={stock}
                                    index={index}
                                    handleChangeQtyInRegisteredProduct={handleChangeQtyInRegisteredProduct}
                                    handleUpdateRegisteredProduct={handleUpdateRegisteredProduct}
                                    deleteRegisteredProduct={deleteRegisteredProduct}
                                />
                            </Col>
                        )
                        : <p>El almacen no cuenta con ningún producto</p>
                    }
                </Row>
            </div>
            : null
        }
    </Fragment>

const StockRegistered = ({
    stock,
    index,
    handleChangeQtyInRegisteredProduct,
    handleUpdateRegisteredProduct,
    deleteRegisteredProduct
}) =>
    <div className="stock-registered-container">
        <p>{stock.product.name}</p>
        <div className="qty-container">
            <p>Cantidad</p>
            <Input
                placeholder='Cantidad'
                value={stock.qty}
                onChange={e => handleChangeQtyInRegisteredProduct(e.target.value, index)}
            />
        </div>
        <MainButton
            className="btn-update-stocks"
            text="Actualizar"
            onClick={() => handleUpdateRegisteredProduct(index) }
        />
        <Icon
            className="icon-delete-stock"
            type="close"
            onClick={() => deleteRegisteredProduct(index)}
        />
    </div>

export default UploadProducts