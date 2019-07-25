import React from 'react'
import './index.scss'
import DashboardCardComponent from '../common/dashboardCard'

const DashboardBody = (props) =>
    <div className="dashboard-body">
        <div className="dasboard-cards-container" >
            <DashboardCardComponent icon='tool' size={64} title='Trabajos' description='Factura para 02 de Julio' width={450} />
            <DashboardCardComponent icon='user' size={64} title='Clientes' description='Cliente en espera' width={450} />
        </div>
        <div className="dasboard-cards-container" >
            <DashboardCardComponent icon='dollar' size={64} title='Contabilidad' description='En espera pago servicio' width={450} />
            <DashboardCardComponent icon='reconciliation' size={64} title='Empleados' description='Sin notificación' width={450} />
        </div>
        <div className="dasboard-cards-container" >
            <DashboardCardComponent icon='solution' size={64} title='Servicios' description='Sin notificación' width={292} />
            <DashboardCardComponent icon='inbox' size={64} title='Productos' description='Nuevo' width={292} />
            <DashboardCardComponent icon='gold' size={64} title='Almacenes' description='Sin espacio' width={292} />
        </div>
    </div>

export default DashboardBody