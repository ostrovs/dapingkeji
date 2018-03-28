import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import Description from '../components/Description';
import Frame from '../assets/Frame';


// const Products = ({ dispatch, products }) => {
class Products extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.upDateContact = this.upDateContact.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.upDateOthers = this.upDateOthers.bind(this);
    this.handleAddGood = this.handleAddGood.bind(this);
    this.handleGoodRemove = this.handleGoodRemove.bind(this);
    this.updateGoodMes = this.updateGoodMes.bind(this);
    this.addImgSuccess = this.addImgSuccess.bind(this);
    this.upDateServiceDesc = this.upDateServiceDesc.bind(this);
  }
  handleDelete(id) {
    this.props.dispatch({
      type: 'pro/delete',
      payload: id,
    });
  }
  upDateContact( contact ) {
    this.props.dispatch({
      type: 'main_data/upDateContact',
      contact
    });
  }
  upDateOthers( data ) {
    this.props.dispatch({
      type: 'main_data/upDateOthers',
      data
    });
  }
  handleRemove( file, target ) {
    this.props.dispatch({
      type: 'main_data/deleteImg',
      file
    })
  }
  handleAddGood( event ) {
    this.props.dispatch({
      type: 'main_data/addGood',
      data: {}
    })
  }
  handleGoodRemove( data ) {
    this.props.dispatch({
      type: 'main_data/removeGood',
      data
    })
  }
  updateGoodMes( data ) {
    this.props.dispatch({
      type: 'main_data/updateGoodMes',
      data
    })
  }
  addImgSuccess( data ) {
    this.props.dispatch({
      type: 'main_data/addImgSuccess',
      data
    })
  }
  upDateServiceDesc( data ) {
    this.props.dispatch({
      type: 'main_data/upDateServiceDesc',
      data
    })
  }
  render() {
    return (
      <Frame {...this.props}>
        <Description
          description={this.props.description} 
          upDateContact={this.upDateContact}
          upDateOthers={this.upDateOthers}
          handleRemove={this.handleRemove}
          handleAddGood={this.handleAddGood}
          handleGoodRemove={this.handleGoodRemove}
          updateGoodMes={this.updateGoodMes}
          addImgSuccess={this.addImgSuccess}
          upDateServiceDesc={this.upDateServiceDesc}
        >
        </Description>
        {/*
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
export default connect(({ pro, main_data, user }) => ({
  products: pro,
  description: main_data,
  user
}))(Products);