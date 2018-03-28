export default {
  namespace: 'pro',
  state: [],
  reducers: {
    'init'(state, { payload: id}) {
      return id;
    },
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'init', payload });
      // const temp = yield call(userService.getMainData, {});
      // console.log(temp);  
    },
  },
};