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

const getWorkStatusByValue = status => {
    const getStatus = Object.entries(statuses).filter(statusPair => statusPair[1] === status)[0]
    return getStatus[0]
}
export { statuses, getWorkStatus, getWorkStatusByValue }