const API_URL = process.env.REACT_APP_API_URL

export const loginEndpoint = `${API_URL}/token-auth/`
export const resetPasswordEndpoint = `${API_URL}/accounts/password_reset/`
export const recoverPasswordEndpoint = `${API_URL}/accounts/password_reset/confirm/`
export const adminsEndpoint = `${API_URL}/admins/`
export const employeesEndpoint = `${API_URL}/employees/`
export const clientsEndpoint = `${API_URL}/clients/`
export const servicesEndpoint = `${API_URL}/services/`
export const productsEndpoint = `${API_URL}/products/`
export const stocksEndpoint = `${API_URL}/stocks/`
export const worksEndpoint = `${API_URL}/works/`
export const transactionsEndpoint = `${API_URL}/financials/transactions/`
export const financialsEndpoint = `${API_URL}/financials/`
export const potentialEmployeesEndpoint = `${API_URL}/potential_employees/`