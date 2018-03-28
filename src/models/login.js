import { routerRedux } from 'dva/router';
import * as userService from '../services/user';
import { message } from 'antd';
export default {
  namespace: 'user',
  state: {
    loginLoading: false
  },
  subscriptions: {
    // alert("subscriptions");
  },
  reducers: {
    'showLoginLoading'(state) {
      let newState = Object.assign({}, state);
        newState.loginLoading = true;
      return newState;
    },
    'hideLoginLoading'(state) {
      let newState = Object.assign({}, state);
        newState.loginLoading = false;
      return newState;
    },
    'setUserName'(state, { userName, id }) {
      let newState = Object.assign({}, state);
        newState.userName = userName;
        newState.id = id;
      return newState;
    }
  },
  effects: {
    *login ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      console.log("values", values);
      const mes = yield call(userService.login, values);
      console.log("mes", mes);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes == "success"){
        message.success("成功登录");
        yield put({ 
          type: 'setUserName', 
          userName: mes.data.data.userName,
          id: mes.data.data.id 
        });
        yield put({ type: 'main_data/fetch' });
        yield put(routerRedux.push('/admin/products'));
      }else{
        message.error("登录失败");
      }
    },
    *register ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      console.log("values", values);
      const mes = yield call(userService.register, values);
      console.log("mes", mes);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes == "success"){
        message.success("注册成功并登录");
        yield put({ 
          type: 'setUserName', 
          userName: mes.data.data.userName,
          id: mes.data.data.id 
        });
        yield put(routerRedux.push('/admin/products'));
        yield put({ 
          type: 'main_data/fetch'
        });
      }else{
        message.error("注册失败");
      }
    },
    *logout ({  }, { call, put }) {
      const mes = yield call(userService.logout);
      if(mes.data.mes == "success"){
        message.success("退出成功");
        yield put({ 
          type: 'setUserName', 
          userName: undefined,
          id: undefined 
        });
        yield put({ 
          type: 'main_data/init', 
          main_data: {}
        });
      }else{
        message.warning("系统异常");
      }
    },
    *changePSD ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      console.log("values", values);
      const mes = yield call(userService.changePSD, values);
      console.log("mes", mes);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes == "success"){
        message.success("更改密码成功");
        yield put(routerRedux.push('/admin/products'));
      }else{
        message.error("更改密码失败");
      }
    },
  }
};