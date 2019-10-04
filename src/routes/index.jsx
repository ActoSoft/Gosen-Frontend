import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'
import Login from '../components/authentication/login'
import ForgotPassword from '../components/authentication/forgotPassword'
import ChangePassword from '../components/authentication/changePassword'
import Dashboard from '../components/dashboard'
import Profile from '../components/admins'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'
import EmployeesList from '../components/employees/list'
import { Route } from 'react-router-dom'


const Routes = () => {
    return (
        <Fragment>
            <Switch>

                {/* Public Routes */}
                <PublicRoute exact path = "/login/" component = { Login } />
                <PublicRoute exact path = "/recuperar-contraseña/" component = { ForgotPassword } />
                <PublicRoute exact path = "/restaurar-contrasena/:token/" component = { ChangePassword } />

                {/* Private Routes */ }
                <PrivateRoute exact path = '/dashboard/' component = { Dashboard } />
                <PrivateRoute
                    exact path = '/perfil/'
                    component = {Profile}
                    action='detail'
                />
                <PrivateRoute
                    exact path = '/perfil/editar/'
                    component = {Profile}
                    action='update'
                />

                {/* Employees Routes */}
                <Route exact path = '/empleados/' component = { EmployeesList } />

            </Switch>
        </Fragment>
    )
}

export default Routes