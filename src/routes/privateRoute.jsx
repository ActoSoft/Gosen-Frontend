import React from 'react'
import { withAuth } from '../Authentication/'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return(
        <Route {...rest} render={ (propsRoute) =>
            auth.isAuthenticated()
                ? <Component { ...propsRoute } { ...rest } />
                : <Redirect to="/login" />
        } />
    )
}

export default withAuth(PrivateRoute)