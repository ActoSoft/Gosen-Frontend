import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const ProductStock = ({
    firstStock,
    lastStock,
    handleMoveStocks,
    data,
    isLeftArrowStockShow,
    isRightArrowStockShow
}) => 
    <Fragment>
        {data && data.length > 0 ?
            <div className="stocks-container">
                <p className="stocks-title">Almacenes</p>
                <div className="product-stocks-container">
                    {
                        isLeftArrowStockShow() ?
                            <p className="arrow" onClick={() => handleMoveStocks('left')}>{'<'}</p>
                            : null
                    }
                    {
                        data.slice(firstStock, lastStock + 1).map(stock =>
                            <Link className="card-container" key = {stock} to={`/almacenes/${stock.stock.id}/`}>
                                <div>
                                    <p className="name">{stock.stock.name}</p>
                                    <p>{`Cantidad ${stock.qty} pzas.`}</p>
                                </div>
                            </Link>
                        )
                    }
                    {
                        isRightArrowStockShow() ?
                            <p className="arrow" onClick={() => handleMoveStocks('right')}>{'>'}</p>
                            : null
                    }
                </div>
            </div>
            : null
        }
    </Fragment>

export default ProductStock
