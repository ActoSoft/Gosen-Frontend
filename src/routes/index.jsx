import React, { Fragment } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Login from '../components/authentication/login'
import { withAuth } from '../Authentication'
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
import ClientList from '../components/clients/list'
import ClientDetail from '../components/clients/detail'
import ClientForm from '../components/clients/form'
import ServicesList from '../components/services/list'
import ServicesDetail from '../components/services/detail'
import ServiceForm from '../components/services/form'
import ProductList from '../components/products/list'
import ProductDetail from '../components/products/detail'
import ProductForm from '../components/products/form'
import StocksList from '../components/stocks/list'
import StockDetail from '../components/stocks/detail'

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

                {/* ===== CLIENTS ROUTES ====== */}
                <PrivateRoute
                    exact path = '/clientes/'
                    component = {ClientList}
                />
                <PrivateRoute
                    exact path = '/clientes/crear'
                    component = {ClientForm}
                />
                <PrivateRoute
                    exact path = '/clientes/:id'
                    component = {ClientDetail}
                />
                <PrivateRoute
                    exact path = '/clientes/:id/editar'
                    component = {ClientForm}
                />
                {/* ===== END EMPLOYEES ROUTES ====== */}

                {/* ===== SERVICES ROUTES ====== */}
                <PrivateRoute
                    exact path = '/servicios'
                    component = {ServicesList}
                />
                <PrivateRoute
                    exact path = '/servicios/crear'
                    component = {ServiceForm}
                />
                <PrivateRoute
                    exact path = '/servicios/:id'
                    component = {ServicesDetail}
                />
                <PrivateRoute
                    exact path = '/servicios/:id/editar'
                    component = {ServiceForm}
                />
                {/* ===== END SERVICES ROUTES ====== */}

                {/* ===== PRODUCTS ROUTES ====== */}
                <PrivateRoute
                    exact path = '/productos'
                    component = {ProductList}
                />
                <PrivateRoute
                    exact path = '/productos/crear'
                    component = {ProductForm}
                />
                <PrivateRoute
                    exact path = '/productos/:id'
                    component = {ProductDetail}
                />
                <PrivateRoute
                    exact path = '/productos/:id/editar'
                    component = {ProductForm}
                />
                {/* ===== END PRODUCTS ROUTES ====== */}

                {/* ===== STOCKS ROUTES ====== */}
                <PrivateRoute
                    exact path = '/almacenes'
                    component = {StocksList}
                />
                {/* <PrivateRoute
                    exact path = '/almaces/crear'
                    component = {ProductForm}
                /> */}
                <PrivateRoute
                    exact path = '/almacenes/:id'
                    component = {StockDetail}
                />
                {/* <PrivateRoute
                    exact path = '/almaces/:id/editar'
                    component = {ProductForm}
                /> */}
                {/* ===== END STOCKS ROUTES ====== */}


                <Redirect to={ auth.isAuthenticated() ? '/dashboard' : '/login' } />
            </Switch>
        </Fragment>
    )
}

export default withAuth(Routes)