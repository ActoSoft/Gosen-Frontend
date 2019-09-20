import React, { Component } from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import Logo from '../../../assets/logo_transparencia_1x.png'
import { withAuth } from '../../../Authentication'
import { NavLink } from 'react-router-dom'

const { SubMenu } = Menu

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            expanded: false,
            left: -256,
            name: localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
        }
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

    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="icon-container">
                        <Icon type="menu" onClick={this.toggleCollapsed} style={{width: 28}} />
                    </div>
                    <div className="logo-container">
                        <NavLink to='/dashboard/'><img className="navbar-logo" src={Logo} alt="Logo Gosen" /></NavLink>
                    </div>
                    <div className="bell-container">
                        <Icon type="bell" />
                    </div>
                </div>
                <div className="menu-container" style={{ width: 256, position: 'absolute', zIndex: 9999, transition: '0.4s', top: 0, left: this.state.left }}>
                    <Menu
                        defaultSelectedKeys={['3']}
                        mode="vertical"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <div className="cross-container">
                            <Icon type="close" onClick={this.toggleCollapsed} />
                        </div>
                        <Menu.Item className="root-item" key="1">
                            <Icon type="home" />
                            <NavLink to='/dashboard/' className="perfil-link" > <span>Inicio</span></NavLink>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="2">
                            <Icon type="reconciliation" />
                            <span>Empleados</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="3">
                            <Icon type="user" />
                            <span>Cliente</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="4">
                            <Icon type="inbox" />
                            <span>Productos</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="5">
                            <Icon type="customer-service" />
                            <span>Servicios</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="6">
                            <Icon type="tool" />
                            <span>Trabajos</span>
                        </Menu.Item>
                        <Menu.Item className="root-item" key="7">
                            <Icon type="container" />
                            <span>Contabilidad</span>
                        </Menu.Item>
                        <SubMenu
                            key="8"
                            title={
                                <span>
                                    <span>{this.state.name}</span>
                                </span>
                            }
                        >
                            <Menu.Item className="sub-item" key="sub1"><NavLink to="/perfil/" className="perfil-link">Perfil</NavLink></Menu.Item>
                            <Menu.Item className="sub-item" key="sub2">Cerrar Sesión</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withAuth(Navbar)