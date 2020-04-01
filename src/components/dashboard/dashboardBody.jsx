import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'
import DashboardCardComponent from '../common/dashboardCard'

const DashboardBody = () =>
    <div className="dashboard-body">
        <div className="dasboard-cards-container" >
            <NavLink to='/trabajos/'>
                <DashboardCardComponent icon='tool' size={64} title='Trabajos' description='Factura para 02 de Julio' width={470} />
            </NavLink>
            <NavLink to='/clientes/'>
                <DashboardCardComponent icon='user' size={64} title='Clientes' description='Cliente en espera' width={470} />
            </NavLink>
        </div>
        <div className="dasboard-cards-container" >
            <NavLink to='/'>
                <DashboardCardComponent icon='dollar' size={64} title='Contabilidad' description='En espera pago servicio' width={470} />
            </NavLink>
            <NavLink to='/empleados/'>
                <DashboardCardComponent icon='reconciliation' size={64} title='Empleados' description='Sin notificación' width={470} />
            </NavLink>
        </div>
        <div className="dasboard-cards-container" >
            <NavLink to='/servicios/'>
                <DashboardCardComponent icon='solution' size={64} title='Servicios' description='Sin notificación' width={310} />
            </NavLink>
            <NavLink to='/productos/'>
                <DashboardCardComponent icon='inbox' size={64} title='Productos' description='Nuevo' width={310} />
            </NavLink>
            <NavLink to='/almacenes/'>
                <DashboardCardComponent icon='gold' size={64} title='Almacenes' description='Sin espacio' width={310} />
            </NavLink>
        </div>
    </div>

export default DashboardBody