const roles = {
    sales: 'Ventas',
    internal: 'Interno',
}

const getPotentialEmployeeRole = role => {
    console.log(role)
    return roles.hasOwnProperty(role) ?
        roles[role]
        : role
}

const getPotentialEmployeeRoleByValue = role => {
    const getRole = Object.entries(roles).filter(rolePair => rolePair[1] === role)[0]
    return getRole[0]
}
export { roles, getPotentialEmployeeRole, getPotentialEmployeeRoleByValue }