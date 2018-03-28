import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import Frame from '../assets/Frame';
import browserHistory from 'react-router';
import Iframe from 'react-iframe';
import { Table } from 'antd';

// const Products = ({ dispatch, products }) => {
class Products extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.props.dispatch({
      type: 'contact/show_contact',
    });
  }
  handleDelete(id) {
    this.props.dispatch({
      type: 'pro/delete',
      payload: id,
    });
  }
  handleIframeOnload(e) {
    // console.dir("handleIframeOnload etarget: ", e.target);
    // console.dir(this);
    // this.height=this.contentWindow.document.documentElement.scrollHeight
    // var ifm = document.getElementById("myiframe");
    // ifm.height = document.documentElement.clientHeight;
  }
  
  render() {
    let contact = this.props.contact;
    let dataSource = [];
    let id = 1;
    for(let key in contact)
    {
      contact[key]["key"] = id;
      contact[key]["user_id"] = undefined;
      dataSource.push(contact[key]);
      id++;
    }
    console.log(dataSource);
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '小程序名称',
      dataIndex: 'appname',
      key: 'appname',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: 'QQ',
      dataIndex: 'qq',
      key: 'qq',
    }, {
      title: '城市',
      dataIndex: 'address',
      key: 'localcity',
    }, {
      title: '需求',
      dataIndex: 'demand',
      key: 'demand',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }];

    
    return (
      <Frame {...this.props}>
       <Table dataSource={dataSource} columns={columns} />
       {/*
        <iframe
          ref="iframe" 
          src="https://www.dapingkeji.com/ostro_dapingkeji/?acc=nanfangxinwujin"
          onLoad={this.handleIframeOnload}
          seamless="seamless"

          style={{
            width: "100%",
            height: "1000px",
            "scrollX": "hidden",
            "scrollY": "auto",
            border: 0
          }}
        >

        </iframe>
        <ProductList 
          onDelete={this.handleDelete} 
          products={this.props.products} 
        />
      */}
      </Frame>
    );
  }
};

// export default Products;
export default connect(({ contact }) => ({
  contact
}))(Products);