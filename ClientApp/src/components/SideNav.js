import React from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"; 
import './SideNav.css';

const { Header, Content, Sider } = Layout;


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

