const statuses = {
    authorized: 'Autorizado',
    canceled: 'Cancelado',
    pending: 'Pendiente',
    finished: 'Finalizado',
    'in_progress': 'En curso'
}

const getWorkStatus = status =>
    statuses.hasOwnProperty(status) ?
        statuses[status]
        : status

export default getWorkStatus