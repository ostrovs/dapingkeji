import React from 'react';
import Frame from '../components/Frame';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
class WrapFrame extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClickLogout = this.handleClickLogout.bind(this);
  // }
  // handleClickLogout() {
  //   this.props.dispatch({
  //     type: "user/logout"
  //   });
  // }
  // componentWillMount() {
  //   routerRedux.push('/login');
  // }
  // render() {
  //   return (
  //     <Frame 
  //       {...this.props} 
  //       userName={this.props.user.userName} 
  //       id={this.props.user.id}
  //       handleClickLogout={this.handleClickLogout}
  //     >
  //     </Frame>
  //   )
  // }
}
export default connect(({ user }) => ({
  user
}))(WrapFrame);