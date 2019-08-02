const API_URL = process.env.REACT_APP_API_URL

export const loginEndpoint = `${API_URL}/token-auth/`
export const resetPasswordEndpoint = `${API_URL}/accounts/password_reset/`
export const recoverPasswordEndpoint = `${API_URL}/accounts/password_reset/confirm/`
export const adminsEndpoint = `${API_URL}/admins/`