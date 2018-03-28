import * as userService from '../services/getdata';
import { message } from 'antd';
export default {
  namespace: 'main_data',
  state: {},
  reducers: {
    'init'(state, { main_data }) {
      return main_data;
    },
    'changeContact'(state, { contact }) {
      let newState = Object.assign({}, state);
      newState.contact["__website"] = contact["website"];
      newState.contact["contact_1"] = contact["phone_1"];
      newState.contact["contact_2"] = contact["phone_2"];
      newState.contact["title"] = contact["title"];
      console.log("old state", state);
      console.log("new state", newState);
      return newState;
    },
    'changeOthers'(state, { data }) {
      let newState = Object.assign({}, state);
      newState.defaultCall = data["defaultCall"];
      newState.goodsTitle = data["goodsTitle"];
      newState.company.desc = data["company"];
      newState.culture.desc = data["culture"];
      console.log("old state", state);
      console.log("new state", newState);
      return newState;

    },
    'changeGood'(state, { data, defaultImg }) {
      let newState = Object.assign({}, state);
      let newGood = {
        date: data[0].date,
        desc: data[0].description,
        goodImgList: [],
        id: data[0].id,
        phoneCall: data[0].tel,
        title: data[0].title,
        visit: data[0].visit,
        img: defaultImg
      }
      newState.goods.push(newGood);
      console.log("old state", state);
      console.log("new state", newState);
      return newState;
    },
    'deleteGood'(state, { data }) {
      let newState = Object.assign({}, state);
      newState.goods.map((good, index) => {
        if(good.id === data.id)
          newState.goods.splice(index, 1);
      });
      console.log("old state", state);
      console.log("new state", newState);
      return newState;
    },
    'changeGoodMes'(state, { data }) {
      let newState = Object.assign({}, state);
      console.log("data", data);
      let title = data[0];
      let desc = data[1];
      let price = data[2];
      let richText = data[3];
      let id = data[4];
      newState.goods.map((good, index) => {
        if(good.id == id)
        {
          good.title = title;
          good.desc = desc;
          good.price = price;
          good.richtext = richText;
        }
      });
      console.log("old state", state);
      console.log("new state", newState);
      return newState;
    },
    'addImgSuccess'(state, { data }) {
      let newState = Object.assign({}, state);
      state.goods.map(({ id }, index) => {
        if(id == data.good_id)
          newState.goods[index].img = data.url;
      });
      console.log("addImgSuccess", data);
      console.log("old state", state);
      console.log("new state", newState);
      return newState;
    }
  },
  effects: {
    *fetch({  }, { call, put }) {  // eslint-disable-line
      const main_data = yield call(userService.getMainData, {});
      // const main_data_str = '{"contact":{"title":"联系我们","__website":"www.dapingkeji.com","contact_1":"13820895939","contact_2":"18302288817"},"defaultCall":"13820895939","bannar":{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/首页大图_1.jpg"},"show":{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/大图.png"},"service":{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/service/大图.png"},"contact_us":{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/联系我们/20111216120011_副本.jpg"},"company":{"desc":"天津南方鑫五金交电成立于2008年，是专业的防尘网、遮阳网、土工布生产厂家。本公司经营地址塘沽区厦门路五金城综合区3-4号厂址山东省泗水县工业园区，公司以自产自销经营本厂主要生产经营二针、三针、四针、六针防尘绿网黑色遮阳网 可根据客户要求加工定做。公司以“诚信为本、重质量、高标准”为准则，在孙总经理的带领下一步步打造质量为本的工程用品！","img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/公司介绍/02f8dd164ee5a38dd0b3cb361a612caf.png"},"culture":{"desc":"我公司秉承：“质量第一、信誉至上、诚信为本。”始终坚持“急为客户所急，想为客户所想，视质量如生命，重诚信与发展”的企业精神。在今天人们追求现代化生活的同时，清新的环境是您生活的必备条件。公司本着“以人为本，诚实守信”的经营理念，恪守“发展自己、服务社会”的宗旨，遵循“科学管理、品质优良、用户满意”的质量方针，良好的售后服务，努力建造一个融“新技术、新工艺、新产品、新效益”为一体的全新企业！","img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/企业文化/大图.jpg"},"goodsTitle":"产品介绍","goods":[{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/土工布/大图1_副本.jpg","title":"土工布展示","desc":"","date":"2017-11-20","visit":48,"phoneCall":13538451558,"goodImgList":[{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/土工布/1.jpg"},{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/土工布/2.jpg"},{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/土工布/3.jpg"}]},{"img":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/防尘网/大图.jpg","title":"防尘网展示","desc":"","date":"2018/1/31 下午2:37:27","visit":48,"phoneCall":13538451558,"goodImgList":[{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/防尘网/2.jpg"},{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/防尘网/3.jpg"},{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/防尘网/4.jpg"},{"url":"http://www.vheeer.com/wx_tmp/ostro_nanfang/image/防尘网/5.jpg"}]}],"theCase":[{"title":"展示","imgs":["http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/1.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/2.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/3.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/4.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/5.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/6.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/7.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/8.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/9.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/10.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/12.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/13.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/14.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/15.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/16.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/17.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/18.jpg","http://www.vheeer.com/wx_tmp/ostro_nanfang/image/show/19.jpg"]}],"theService":[{"title":"","imgs":["http://www.vheeer.com/wx_tmp/ostro_nanfang/image/service/1.png"]}]}';
      // let main_data = {};
          // main_data.data = JSON.parse(main_data_str);
      if(main_data.data.mes == "success"){
        yield put({ type: 'init', main_data: main_data.data.main_data });
        message.success('获取信息成功');
      }else{
        message.error('获取信息失败');
      }
    },
    *upDateContact({ contact }, { call, put }) {
      const mes = yield call(userService.changeContact, contact);
      console.log("mes", mes);
      if(mes.data.mes === "success"){
        yield put({ type: 'changeContact', contact: contact });
        message.success('成功修改联系方式');
      }else{
        message.warning('操作未成功');
      }
    },
    *upDateOthers({ data }, { call, put }) {
      const mes = yield call(userService.changeOthers, data);
      console.log("mes", mes);
      if(mes.data.mes === "success"){
        yield put({ type: 'changeOthers', data: data });
        message.success('成功修改信息');
      }else{
        message.warning('操作未成功');
      }
    },
    *deleteImg({ file }, { call, put }) {
      const mes = yield call(userService.deleteImg, file);
      if(mes.data.mes === "success"){
        message.success('删除成功');
        if(mes.data.data.target == "goodTitleImg"){
          yield put({ type: 'addImgSuccess', data: { good_id: mes.data.data.good_id, url: "" } });
        }
      }else{
        message.warning('操作未成功');
      }
    },
    *addGood({ data }, { call, put }) {
      const mes = yield call(userService.addGood, data);
      if(mes.data.mes === "success"){
        yield put({ type: 'changeGood', data: mes.data.data, defaultImg: mes.data.defaultImg });
        message.success('成功添加商品');
      }else{
        message.warning('操作未成功');
      }
    },
    *removeGood({ data }, { call, put }) {
      console.log("removeGood data ", data)
      const mes = yield call(userService.removeGood, data);
      if(mes.data.mes === "success"){
        yield put({ type: 'deleteGood', data: mes.data.data });
        message.success('删除商品成功');
      }else{
        message.warning('操作未成功');
      }
    },
    *updateGoodMes({ data }, { call, put }) {
      console.log("updateGoodMes data ", data)
      const mes = yield call(userService.updateGoodMes, data);
      if(mes.data.mes === "success"){
        yield put({ type: 'changeGoodMes', data: mes.data.data });
        message.success('更改商品信息成功');
      }else{
        message.warning('操作未成功');
      }
    },
    *upDateServiceDesc({ data }, { call, put }) {
      console.log("upDateServiceDesc data ", data)
      const mes = yield call(userService.upDateServiceDesc, data);
      if(mes.data.mes === "success"){
        yield put({ type: 'changeServiceDesc', data: mes.data.data });
        message.success('更改商品信息成功');
      }else{
        message.warning('操作未成功');
      }
    }
  },
};