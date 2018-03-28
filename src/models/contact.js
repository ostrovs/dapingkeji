import { routerRedux } from 'dva/router';
import * as userService from '../services/getdata';
import { message } from 'antd';
export default {
  namespace: 'contact',
  state: [],
  subscriptions: {
    // alert("subscriptions");
  },
  reducers: {
    'change_contact'(state, { data }) {
      let newState = Object.assign({}, data);
      return newState;
    }
  },
  effects: {
    *show_contact ({ values }, { call, put }) {
      console.log("values", values);
      const mes = yield call(userService.show_contact, values);
      console.log("mes", mes);
      if(mes.data){
        yield put({ type: "change_contact", data: mes.data });
        message.success("信息加载成功");
      }else{
        message.error("信息加载失败");
      }
    },
  }
};