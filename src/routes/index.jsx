import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../components/authentication/login'
import ForgotPassword from '../components/authentication/forgotPassword'
import PrivateRoute from './privateRoute'
import Caca from '../components/caca'

const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path = "/login/" component = { Login } />
                <Route exact path = "/forgot_password/" component = { ForgotPassword } />
                <PrivateRoute exact path = '/tu-caca/' component = { Caca } />
            </Switch>
        </Fragment>
    )
}

export default Routes;