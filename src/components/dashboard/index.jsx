import React, {Component} from 'react'
import './index.scss'
import DashboardCardComponent from '../common/dashboardCard'
import CheckBoxComponent from '../common/checkBox'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [
                'skere',
                'kasjdf',
                'alskdjf',
                'liasjdf'
            ]
        }
    }

    render() {
        return (
            <div className="dashboard-container">
                <body>
                    <div className="dashboard-body">
                        <div className="dasboard-cards-container" >
                            <DashboardCardComponent icon='tool' size={64} title='Trabajos' description='Factura para 02 de Julio' width={400} />
                            <DashboardCardComponent icon='user' size={64} title='Clientes' description='Cliente en espera' width={400} />
                        </div>
                        <div className="dasboard-cards-container" >
                            <DashboardCardComponent icon='dollar' size={64} title='Contabilidad' description='En espera pago servicio' width={400} />
                            <DashboardCardComponent icon='reconciliation' size={64} title='Empleados' description='Sin notificación' width={400} />
                        </div>
                        <div className="dasboard-cards-container" >
                            <DashboardCardComponent icon='solution' size={64} title='Servicios' description='Sin notificación' width={270} />
                            <DashboardCardComponent icon='inbox' size={64} title='Productos' description='Nuevo' width={270} />
                            <DashboardCardComponent icon='gold' size={64} title='Almacenes' description='Sin espacio' width={270} />
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default Dashboard