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
      collapsed: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  handleDelete(id) {
    this.props.dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  render() {
    return (

      <Layout className={styles.main}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          {/*<Menus />*/}
        </Sider>
        <Layout>
          <Header className={""} style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.menu_trigger_box_trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <ProductList 
              onDelete={this.handleDelete} 
              products={this.props.products} 
            />
          </Content>
        </Layout>
      </Layout>
    /*
    <div>
      <Menus />
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  */
  );
  }
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);