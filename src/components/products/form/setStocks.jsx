import React, { Fragment } from 'react'
import { Icon, Row, Col } from 'antd'
import MainButton from '../../common/mainButton'
import Select from '../../common/select'
import Input from '../../common/inputText'
import './index.scss'

const SetInStocks = ({
    finishCreateProduct,
    stocks,
    productStocks,
    newQty,
    handleSelectNewStock,
    handleChangeNewQty,
    handleSaveProductInStock,
    handleChangeQtyInRegisteredStock,
    handleUpdateRegisteredStock,
    deleteRegisteredStock,
    isStocksVisible,
    selectedStock
}) =>
    <Fragment>
        { isStocksVisible ?
            <div className='profile-container service-container'>
                <div className="header-container services">
                    <div className="header-text-container-update">
                        <p className="label-images-create">Agrega el producto en almacenes</p>
                    </div>
                    <div className="buttons-service-form">
                        <MainButton
                            text='Finalizar'
                            className="edit-buttons"
                            onClick={() => finishCreateProduct()}
                        />
                    </div>
                </div>
                <Row className="product-stocks-add-container">
                    <Col span={8} offset={1}>
                        <p>Selecciona un almacén</p>
                        <Select
                            className='select-stock'
                            options={stocks.map(stock => stock.name)}
                            name="Almacenes"
                            onChange={value => handleSelectNewStock(value)}
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
                            disabled={selectedStock ? false : true}
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <MainButton
                            text='Guardar producto en almacén'
                            disabled={selectedStock ? false : true}
                            onClick={() => handleSaveProductInStock()}
                        />
                    </Col>
                </Row>
                <Row className="product-stocks-existing-container">
                    <p className="label-stocks-registered">Almacenes registrados</p>
                    {productStocks ?
                        productStocks.map((stock, index) =>
                            <Col
                                span={5}
                                offset={1}
                                key={stock.stock.id}
                            >
                                <StockRegistered
                                    stock={stock}
                                    index={index}
                                    handleChangeQtyInRegisteredStock={handleChangeQtyInRegisteredStock}
                                    handleUpdateRegisteredStock={handleUpdateRegisteredStock}
                                    deleteRegisteredStock={deleteRegisteredStock}
                                />
                            </Col>
                        )
                        : <p>El producto no existe en ningún stock</p>
                    }
                </Row>
            </div>
            : null
        }
    </Fragment>

const StockRegistered = ({
    stock,
    index,
    handleChangeQtyInRegisteredStock,
    handleUpdateRegisteredStock,
    deleteRegisteredStock
}) =>
    <div className="stock-registered-container">
        <p>{stock.stock.name}</p>
        <div className="qty-container">
            <p>Cantidad</p>
            <Input
                placeholder='Cantidad'
                value={stock.qty}
                onChange={e => handleChangeQtyInRegisteredStock(e.target.value, index)}
            />
        </div>
        <MainButton
            className="btn-update-stocks"
            text="Actualizar"
            onClick={() => handleUpdateRegisteredStock(index) }
        />
        <Icon
            className="icon-delete-stock"
            type="close"
            onClick={() => deleteRegisteredStock(index)}
        />
    </div>

export default SetInStocks