import React from 'react';
import { Menu, Icon } from 'antd';
export default class Menus extends React.Component {
  constructor(props) {
    super(props);
    let hash = window.location.hash.split("#/")[1];
    let dir_1 = hash.split("/")[0];
    this.state = {
      defaultKey: [hash?"#/"+hash:"#/company/message"],
      openDefaultKey: [dir_1?dir_1:"company"]
    };
    console.log(hash);
    // window.location.hash = hash ;  
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {  
    console.log('click ', e);  
    this.setState({  
      current: e.key,  
      openDefaultKey: e.keyPath.slice(1),  
    });  
    console.log(this.state.openKeys + "__" + this.state.current);  
    //window.location.hash = e.key;  
  }  
  render() {
    return (
          <Menu 
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={this.state.defaultKey}
            defaultOpenKeys={this.state.openDefaultKey}
            onClick={this.handleClick}
          >
            <Menu.SubMenu 
              key="company"
              title={
                <span>
                  <Icon type="global" />
                  <span>大萍科技</span>
                </span>
              }
            >
              <Menu.Item key="#/company/message">
                <a href="#/company/message">
                  <Icon type="user" />
                  <span>公司简介</span>
                </a>
              </Menu.Item>
              <Menu.Item key="#/company/products">
                <a href="#/company/products">
                  <Icon type="video-camera" />
                  <span>公司产品</span>
                </a>
              </Menu.Item>
              <Menu.Item key="#/company/contact">
                <a href="#/company/contact">
                  <Icon type="upload" />
                  <span>联系我们</span>
                </a>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu 
              key="admin"
              title={
                <span>
                  <Icon type="dashboard" />
                  <span>后台管理</span>
                </span>
              }
            >
              <Menu.Item key="#/admin/message">
                <a href="#/admin/message">
                  <Icon type="user" />
                  <span>我的信息</span>
                </a>
              </Menu.Item>
              <Menu.Item key="#/admin/products">
                <a href="#/admin/products">
                  <Icon type="video-camera" />
                  <span>我的产品</span>
                </a>
              </Menu.Item>
              <Menu.Item key="#/admin/contact">
                <a href="#/admin/contact">
                  <Icon type="upload" />
                  <span>联系方式</span>
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        )
  }
}