import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Layout, Breadcrumb, Grid, Row, Col } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import styles from '../index.css';
import Menus from './Menus';
const { Header, Sider, Content } = Layout;

export default class Frame extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        collapsed: false
      };
      console.log(props);
  }
  toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
  }
  static propTypes = {  
       // products: PropTypes.array.isRequired  
  }
  render() {
      console.log("Frame this.props", this.props);
    return (
      <Layout id="bj" className={styles.main}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" />
              <Menus />
            </Sider>
            <Layout>
              <Header className={""} style={{ background: '#fff', padding: 0 }}>

                    
                      <Icon
                        className={styles.menu_trigger_box_trigger}
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                      />
                    
                      <a>{this.props.userName}</a>
                      <div
                        style={{
                          position: "relative",
                          float: "right",
                          top: "20px",
                          right: "20px",
                        }}
                      >
                      {
                        !this.props.id
                        ?
                        <Breadcrumb>
                          <Breadcrumb.Item><a href="#/login" onClick={this.props.handleClickLogin}>登录</a></Breadcrumb.Item>
                          <Breadcrumb.Item><a href="#/register" onClick={this.props.handleClickRegister}>注册</a></Breadcrumb.Item>
                        </Breadcrumb>
                        :
                        <Breadcrumb>
                          <Breadcrumb.Item><a onClick={this.props.handleClickLogout}>退出</a></Breadcrumb.Item>
                          <Breadcrumb.Item><a href="#/changePSD" >改密</a></Breadcrumb.Item>
                        </Breadcrumb>
                      }
                      </div>
                      
                    
              </Header>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                  {this.props.children}
                </div>
              </Content>
            </Layout>
          </Layout>
    )
  }
}