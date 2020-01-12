import React, { Fragment } from 'react'
import defaultProduct from '../../../assets/default-product.png'
import { Link } from 'react-router-dom'

const StockProducts = ({
    firstProduct,
    lastProduct,
    handleMoveProduct,
    data,
    isLeftArrowProductShow,
    isRightArrowProductShow
}) =>
    <Fragment>
        {data ?
            <div className="stocks-container">
                <p className="stocks-title">Productos existentes en este almacén</p>
                <div className="product-stocks-container">
                    {
                        isLeftArrowProductShow() ?
                            <p className="arrow" onClick={() => handleMoveProduct('left')}>{'<'}</p>
                            : null
                    }
                    {
                        data.length > 0 ?
                            data.slice(firstProduct, lastProduct + 1).map(product =>
                                <Link className="card-container" to = {`/productos/${product.product.id}/`} key = {product.product.name}>
                                    <div>
                                        <img src={product.product.images.length > 0 ? product.product.images[0].image : defaultProduct} alt={product.product.name}/>
                                        <p className="name">{product.product.name}</p>
                                        <p>{`Cantidad: ${product.qty} pzas.`}</p>
                                    </div>
                                </Link>
                            )
                            : <p className="not-products-in-stock">No existen productos dentro de este almacén ☹️</p>
                    }
                    {
                        isRightArrowProductShow() ?
                            <p className="arrow" onClick={() => handleMoveProduct('right')}>{'>'}</p>
                            : null
                    }
                </div>
                { data.length > 0 ? <p className="total-products-in-stock">Total de productos: {data.length}</p> : null }
            </div>
            : null
        }
    </Fragment>

export default StockProducts
