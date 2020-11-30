import React from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from "react-router-dom"; 
import { Row, Col } from 'antd';
import './SideNav.css';

import { useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const { Header, Content, Sider } = Layout;

export function SignIn() {

    const spanStyle = {color: "white"};
    const buttonStyle = {marginLeft: 5};

    const { instance, accounts, inProgress } = useMsal();

    if (accounts.length > 0) {
        return (
        <div>
            <span style={spanStyle}>{accounts[0].username}</span>
            <Button type="default" onClick={() => instance.logout()} style={buttonStyle}>Logout</Button>
        </div>
        );
    } else if (inProgress === "login") {
        return <span style={spanStyle}>Login is currently in progress</span>
    } else {
        return (
            <div>
                <span style={spanStyle}>Welcome User!</span>
                <Button type="default" onClick={() => instance.loginPopup()} style={buttonStyle}>Login</Button>
            </div>
        );
    }
}

export class SideNav extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        
        return (
            <Layout className="site-layout-background" style={{ minHeight: '100vh', margin: "none" }}>
                <Header className="header">
                <div className="logo" />
                    <Row>
                        <Col span={8} offset={20}>
                            <SignIn />
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}> 
                                <Link to="/donors">Donors</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="site-layout-background">
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout> 
            </Layout>
        );
    }
}

