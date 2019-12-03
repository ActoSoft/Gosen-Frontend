import React, { Component } from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import Logo from '../../../assets/logo_transparencia_1x.png'
import { withAuth } from '../../../Authentication'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
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
                        defaultSelectedKeys={['1']}
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
                            <NavLink to="/empleados/">
                                <Icon type="reconciliation" />
                                <span>Empleados</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="3">
                            <NavLink to="/clientes/">
                                <Icon type="user" />
                                <span>Clientes</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="4">
                            <Icon type="inbox" />
                            <NavLink to="/productos/">
                                <span>Productos</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="5">
                            <NavLink to="/servicios/">
                                <Icon type="customer-service" />
                                <span>Servicios</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="6">
                            <Icon type="tool" />
                            <span>Trabajos</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="7">
                            <Icon type="container" />
                            <span>Contabilidad</span>
                        </Menu.Item>
                        <SubMenu key="8" title={this.state.name}>
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