import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import styles from './index.css';
import Frame from '../components/Frame';
import Menus from '../components/Menus';
const { Header, Sider, Content } = Layout;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    this.props.handleLogin(values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {/*
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
          {/*Or <a href="">register now!</a>*/}
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(values) {
    this.props.dispatch({ type: 'user/login', values });
  }
  render() {
    console.log("Login this.props", this.props);
    return (
      <Frame {...this.props}>
        <h1>用户登陆</h1>
        <WrappedNormalLoginForm handleLogin={this.handleLogin}></WrappedNormalLoginForm>
        <p>{this.props.user.loginLoading?"加载中...":""}</p>
      </Frame>
    );
  }
};

export default connect(({ user }) => ({
  user: user,
}))(Login);