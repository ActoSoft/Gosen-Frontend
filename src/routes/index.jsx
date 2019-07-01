import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../components/authentication/login'
import ForgotPassword from '../components/authentication/forgotPassword'
import ChangePassword from '../components/authentication/changePassword'
import Dashboard from '../components/dashboard'
import PrivateRoute from './privateRoute'


const Routes = () => {
    return (
        <Fragment>
            <Switch>

                {/* Public Routes */}
                <Route exact path = "/login/" component = { Login } />
                <Route exact path = "/recuperar-contraseña/" component = { ForgotPassword } />
                <Route exact path = "/restaurar-contrasena/:token/" component = { ChangePassword }/>

                {/* Private Routes */}
                <PrivateRoute exact path = '/dashboard/' component = { Dashboard } />

            </Switch>
        </Fragment>
    )
}

export default Routes;