import React from 'react';
import Frame from '../components/Frame';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
class WrapFrame extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickChangePSD = this.handleClickChangePSD.bind(this);
  }
  handleClickLogout() {
    this.props.dispatch({
      type: "user/logout"
    });
  }
  handleClickChangePSD() {
    this.props.dispatch({
      type: "user/changePSD"
    });
  }
  componentWillMount() {
    console.log("this.props.match", this.props.match);
    let userName, id, login, path;
    if(this.props.match)
      path = this.props.match.path;
    if(window.location.origin === "http://localhost:8000"){
      userName = "zhangjizhe1993728@126.com";
      id = 22;
    }else{
      userName = Cookies.get('userName');
      id = Cookies.get('id');
      login = Cookies.get('login');
      if(login === "1"){
        //已经登录
      }else if(login === "0"){
        //未登录
        if(path && path.split("/")[1] === "admin")
          this.props.dispatch(routerRedux.push('/login'));
      }else if(login === undefined){
        //未登录
        if(path && path.split("/")[1] === "admin")
          this.props.dispatch(routerRedux.push('/login'));
      }
    // this.props.dispatch(routerRedux.push('/login'));
    }
  }
  render() {
    return (
      <Frame 
        {...this.props} 
        userName={this.props.user.userName} 
        id={this.props.user.id}
        handleClickLogout={this.handleClickLogout}
        handleClickChangePSD={this.handleClickChangePSD}
      >
      </Frame>
    )
  }
}
export default connect(({ user }) => ({
  user
}))(WrapFrame);