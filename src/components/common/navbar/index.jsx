import React, { Component } from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import Logo from '../../../assets/logo_transparencia_1x.png'
import { withAuth } from '../../../Authentication'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
const { SubMenu } = Menu

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            expanded: false,
            left: -256,
            name: `${this.props.auth.firstName} ${this.props.auth.lastName}`
        }
        this.logout = this.props.auth.logout
    }

    toggleCollapsed = () => {
        this.state.left === -256 ?
            this.setState({
                left: 0
            })
            : this.setState({
                left: -256
            })
    }

    handleLogout = () => {
        this.logout()
        toast.info('Se ha cerrado la sesión')
        setTimeout(() =>
            this.props.history.push('/login'),
        1000)
    }

    render() {
        let path = this.props.location.pathname
        let defaultMenuIndex = '1'

        switch (true) {
            case path.includes('dashboard/'):
                defaultMenuIndex = '1'
                break;
            case path.includes('empleados-postulantes/'):
                defaultMenuIndex = '2'
                break;
            case path.includes('empleados/'):
                defaultMenuIndex = '3'
                break;
            case path.includes('clientes/'):
                defaultMenuIndex = '4'
                break;
            case path.includes('servicios/'):
                defaultMenuIndex = '5'
                break;
            case path.includes('productos/'):
                defaultMenuIndex = '6'
                break;
            case path.includes('almacenes/'):
                defaultMenuIndex = '7'
                break;
            case path.includes('trabajos/'):
                defaultMenuIndex = '8'
                break;
            // case path.includes('dashboard/'):
            //     defaultMenuIndex = '1'
            //     break;
            default:
                break;
        }

        return (
            <div>
                <div className="navbar">
                    <div className="icon-container">
                        <Icon
                            type="menu"
                            onClick={ this.toggleCollapsed }
                            style={{ width: 28 }}
                        />
                        <Icon
                            type="arrow-left"
                            onClick={ this.props.history.goBack }
                            style={{ width: 28 }}
                        />
                    </div>
                    <div className="logo-container">
                        <NavLink to='/dashboard/'>
                            <img
                                className="navbar-logo"
                                src={Logo}
                                alt="Logo Gosen"
                            />
                        </NavLink>
                    </div>
                    <div className="bell-container">
                        <Icon type="bell" />
                    </div>
                </div>
                <div className="menu-container" style={{
                    left: this.state.left
                }}>
                    <Menu
                        defaultSelectedKeys={[defaultMenuIndex]}
                        mode="vertical"
                        theme="dark"
                    >
                        <div className="cross-container">
                            <Icon type="close" onClick={this.toggleCollapsed} />
                        </div>
                        <Menu.Item className="root-item" key="1">
                            <Icon type="home" />
                            <NavLink to='/dashboard/'>
                                <span>Inicio</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="2">
                            <Icon type="audit" />
                            <NavLink to='/empleados-postulantes/'>
                                <span>Postulantes</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="3">
                            <NavLink to="/empleados/">
                                <Icon type="reconciliation" />
                                <span>Empleados</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="4">
                            <NavLink to="/clientes/">
                                <Icon type="user" />
                                <span>Clientes</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="5">
                            <NavLink to="/servicios/">
                                <Icon type="customer-service" />
                                <span>Servicios</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="6">
                            <Icon type="inbox" />
                            <NavLink to="/productos/">
                                <span>Productos</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="7">
                            <Icon type="inbox" />
                            <NavLink to="/almacenes/">
                                <span>Almacenes</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="8">
                            <Icon type="tool" />
                            <NavLink to="/trabajos/">
                                <span>Trabajos</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="9">
                            <Icon type="container" />
                            <span>Contabilidad</span>
                        </Menu.Item>
                        <SubMenu key="10" title={this.state.name}>
                            <Menu.Item className="sub-item" key="sub1">
                                <NavLink to="/perfil/">Perfil</NavLink>
                            </Menu.Item>
                            <Menu.Item className="sub-item" key="sub2">
                                <NavLink to="/administradores/">Administradores</NavLink>
                            </Menu.Item>
                            <Menu.Item
                                className="sub-item"
                                key="sub3"
                                onClick={this.handleLogout}
                            >
                                Cerrar Sesión
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withAuth(Navbar)