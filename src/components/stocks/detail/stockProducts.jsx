import React, { Fragment } from 'react'
import defaultProduct from '../../../assets/default-product.png'

const StockProducts = ({
    firstProduct,
    lastProduct,
    handleMoveProduct,
    data,
    isLeftArrowProductShow,
    isRightArrowProductShow
}) =>
    <Fragment>
        {data && data.length > 0 ?
            <div className="stocks-container">
                <p className="stocks-title">Productos existentes en este almacén</p>
                <div className="product-stocks-container">
                    {
                        isLeftArrowProductShow() ?
                            <p className="arrow" onClick={() => handleMoveProduct('left')}>{'<'}</p>
                            : null
                    }
                    {
                        data.slice(firstProduct, lastProduct + 1).map(product =>
                            <div className="card-container" key = {product.product.name}>
                                <img src={product.product.images.length > 0 ? product.product.images[0].image : defaultProduct} alt={product.product.name}/>
                                <p className="name">{product.product.name}</p>
                                <p>{`Cantidad: ${product.qty} pzas.`}</p>
                            </div>
                        )
                    }
                    {
                        isRightArrowProductShow() ?
                            <p className="arrow" onClick={() => handleMoveProduct('right')}>{'>'}</p>
                            : null
                    }
                </div>
                <p className="total-products-in-stock">Total de productos: {data.length}</p>
            </div>
            : null
        }
    </Fragment>

export default StockProducts
