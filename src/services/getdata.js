import request from '../utils/request';
import { ajax } from '../utils/cfun';
import fetch from 'dva/fetch'
import config from '../config'


export function getMainData() {
  return request(config.host + '/main_data');
}
export function changeContact(contact) {
  console.log("JSON.stringify(contact)", JSON.stringify(contact));
  return request(config.host + '/changeContact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
}
export function changeOthers(data) {
  console.log("JSON.stringify(data)", JSON.stringify(data));
  return request(config.host + '/changeOthers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export function deleteImg(file) {
  file.url = file.thumbUrl = undefined;
  let url = config.host + '/deleteImg'
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: JSON.stringify(file),
  });
}

export function addGood(data) {
  console.log("JSON.stringify(data)", JSON.stringify(data));
  return request(config.host + '/addGood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).replace('\'','"'),
  });
}
export function removeGood(data) {
  data = Object.assign({}, data);
  data.goodImgList = "no";
  console.log("JSON.stringify(data)", JSON.stringify(data));
  return request(config.host + '/removeGood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export function updateGoodMes(data) {
  console.log("data goodmes data: ", data);
  // let stringData = JSON.stringify();
  // stringData = stringData.replace("\"", "92EB5FFEE6AE2FEC3AD71C777531578F");
  // alert(3);

  // ajax(config.host + '/updateGoodMes', (x)=>{
  //   alert(x);
  // }, ()=>null, "POST", "str=" + encodeURI(stringData), "text");

  // console.log("JSON.stringify(data)", stringData);
  // console.log("JSON.stringify(data) parse", JSON.parse(stringData));
  // return false;
  return request(config.host + '/updateGoodMes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      // 'Content-Type': 'application/json',
    },
    body: ""
      + "richtext=" + data.data.values.richText
      + "&price=" + data.data.values.price
      + "&desc=" + data.data.values.desc
      + "&title=" + data.data.values.title
      + "&id=" + data.data.goodItem.id
    ,
  });
}
export function upDateServiceDesc(data) {
  console.log("JSON.stringify(data)", JSON.stringify(data));
  return request(config.host + '/upDateServiceDesc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export function show_contact(data) {
  console.log("JSON.stringify(data)", JSON.stringify(data));
  return request(config.host + '/show_contact', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
