import React from 'react'
import { withAuth } from '../Authentication/'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route {...rest} render={ (propsRoute) =>
            !auth.isAuthenticated()
                ? <Component { ...propsRoute } />
                : <Redirect to="/dashboard" />
        } />
    )
}

export default withAuth(PublicRoute)