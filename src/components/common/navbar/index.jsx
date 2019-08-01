import React, {Component} from 'react'
import './index.scss'
import { Menu, Icon, Button } from 'antd'
import Logo from '../../../assets/logo_transparencia_1x.png'

const { SubMenu } = Menu;

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            expanded: false,
        }
    }

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    
    toggleExpanded = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render () {
        return (
            <div>
                <div className="navbar">
                    <div className="icon-container">
                        <Icon type="menu" onClick={this.toggleCollapsed} />
                    </div>
                    <div className="logo-container">
                        <img className="navbar-logo" src={ Logo } alt="Logo Gosen" />
                    </div>
                    <div className="bell-container">
                        <Icon type="bell" />
                    </div>
                </div>
                <div style={{ width: 256, visibility:this.state.collapsed ? "hidden" : "visible" }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        >
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="inbox" />
                            <span>Option 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="pie-chart" />
                            <span>Option 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="desktop" />
                            <span>Option 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="inbox" />
                            <span>Option 6</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="inbox" />
                            <span>Option 7</span>
                        </Menu.Item>
                        <SubMenu
                            key="8"
                            title={
                            <span>
                                <Icon type="mail" />
                                <span>José Ángel Cardenas</span>
                            </span>
                            }
                        >
                            <Menu.Item key="sub1">Perfil</Menu.Item>
                            <Menu.Item key="sub2">Cerrar Sesión</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}
export default Navbar