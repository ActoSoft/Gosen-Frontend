import React from 'react'
import { withAuth } from '../Authentication/context'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    console.log(auth.isAuthenticated())
    return(
    <Route {...rest} render={ (propsRoute) => (
        auth.isAuthenticated()
            ? <Component { ...propsRoute } />
            : <Redirect to="/login" />
    )} />)
    }

export default withAuth(PrivateRoute)
