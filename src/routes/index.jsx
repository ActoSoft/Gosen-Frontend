import React, { Fragment } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Login from '../components/authentication/login'
import ForgotPassword from '../components/authentication/forgotPassword'
import ChangePassword from '../components/authentication/changePassword'
import Dashboard from '../components/dashboard'
import Profile from '../components/admins'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'
import EmployeesList from '../components/employees/list'
import AdminList from '../components/admins/adminsList'
import AdminDetail from '../components/admins/adminDetail'
import AdminForm from '../components/admins/adminForm'
import { Route } from 'react-router-dom'
import { withAuth } from '../Authentication'



const Routes = ({auth}) => {
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
                    exact path = '/administradores/'
                    component = {AdminList}
                />
                <PrivateRoute
                    exact path = '/administradores/crear'
                    component = {AdminForm}
                />
                <PrivateRoute
                    exact path = '/administradores/:id'
                    component = {AdminDetail}
                />
                <PrivateRoute
                    exact path = '/perfil/editar/'
                    component = {Profile}
                    action='update'
                />

                {/* Employees Routes */}
                <Route exact path = '/empleados/' component = { EmployeesList } />

                <Redirect to={ auth.isAuthenticated() ? '/dashboard' : '/login' } />
            </Switch>
        </Fragment>
    )
}

export default withAuth(Routes)