import React, { createContext } from 'react'
import Authentication from './authentication';

const AuthContext = createContext(null)

export const withAuth = Component => props => (
    <AuthContext.Provider value={ new Authentication() }>
        <AuthContext.Consumer>
            { auth => <Component {...props} auth={auth} />}
        </AuthContext.Consumer>
    </AuthContext.Provider>
)

export default AuthContext