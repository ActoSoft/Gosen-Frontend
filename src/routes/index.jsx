import React, { Fragment } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Login from '../components/authentication/login'
import ForgotPassword from '../components/authentication/forgotPassword'
import ChangePassword from '../components/authentication/changePassword'
import Dashboard from '../components/dashboard'
import Profile from '../components/admins'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'
import AdminList from '../components/admins/adminsList'
import AdminDetail from '../components/admins/adminDetail'
import AdminForm from '../components/admins/adminForm'
import EmployeeList from '../components/employees/list/'
import EmployeeDetail from '../components/employees/detail'
import EmployeeForm from '../components/employees/form/'
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

                {/* ===== PROFILE ROUTES ====== */}
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
                {/* ===== END PROFILE ROUTES ====== */}

                {/* ===== ADMIN ROUTES ====== */}
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
                    exact path = '/administradores/:id/editar'
                    component = {AdminForm}
                />
                {/* ===== END ADMIN ROUTES ====== */}

                {/* ===== EMPLOYEES ROUTES ====== */}
                <PrivateRoute
                    exact path = '/empleados/'
                    component = {EmployeeList}
                />
                <PrivateRoute
                    exact path = '/empleados/crear'
                    component = {EmployeeForm}
                />
                <PrivateRoute
                    exact path = '/empleados/:id'
                    component = {EmployeeDetail}
                />
                <PrivateRoute
                    exact path = '/empleados/:id/editar'
                    component = {EmployeeForm}
                />
                {/* ===== END EMPLOYEES ROUTES ====== */}

                <Redirect to={ auth.isAuthenticated() ? '/dashboard' : '/login' } />
            </Switch>
        </Fragment>
    )
}

export default withAuth(Routes)