import React, { Fragment } from 'react'
import { Skeleton } from 'antd'
import { formatDate } from '../../../utils'

const ContractDetail = ({ data }) =>
    <Fragment>
        {data ?
            <div>
                <div className="data-container not-padding-top">
                    <div className="data-column labels">
                        <p>Inicio de contrato</p>
                        <p>Periodo de pago</p>
                        <p>Contratado por: </p>
                    </div>
                    <div className="data-column info data-column-info-1">
                        <div>
                            <p>{formatDate(data.contract_date_start)}</p>
                            <p>{data.payment_type}</p>
                            <p>{`${data.contracted_by.user.first_name} ${data.contracted_by.user.last_name}`}</p>
                        </div>
                    </div>
                    <div className="data-column labels data-column-2">
                        <p>Salario</p>
                        <p>Duración</p>
                        <p>Activo</p>
                    </div>
                    <div className="data-column info data-column-info-2">
                        <div>
                            <p>{data.salary}</p>
                            <p>{data.vigency}</p>
                            <p>{data.active ? 'SI' : 'NO'}</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="skeleton">
                <Skeleton active />
            </div>
        }
    </Fragment>

export default ContractDetail