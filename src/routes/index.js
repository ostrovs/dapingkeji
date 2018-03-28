import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import Menus from '../components/Menus';
import { Table, Popconfirm, Button, Menu, Icon, Layout } from 'antd';
import styles from './Product.css';
const { Header, Sider, Content } = Layout;


// const Products = ({ dispatch, products }) => {
class Products extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(id) {
    this.props.dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  render() {
    return (
      <ProductList 
        onDelete={this.handleDelete} 
        products={this.props.products} 
      />
    );
  }
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);