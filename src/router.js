import React from 'react';
import { Router, Route, Switch, routerRedux } from 'dva/router';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Admin_products from './routes/Admin_products';
import Admin_message from './routes/Admin_message';
import Admin_contact from './routes/Admin_contact';
import Company_products from './routes/Company_products';
import Company_message from './routes/Company_message';
import Company_contact from './routes/Company_contact';
import Frame from './routes/Frame';
import Login from './routes/Login';
import Register from './routes/Register';
import ChangePSD from './routes/ChangePSD';
import Cookies from 'js-cookie';
import config from './config'
import { Layout, Icon, Button } from 'antd';
import styles from './index.css';
import Menus from './components/Menus'
// import Cookie from ''
const { Header, Sider, Content } = Layout;
const { defaultId, defaultAcc } = config;
class XXX extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		console.log("origin", window.location.origin);
		let userName,id,login;
		if(window.location.origin === "http://localhost:8000"){
			userName = "zhangjizhe1993728@126.com";
			id = 14;
			this.props.dispatch({
				type: 'user/setUserName',
				userName: defaultAcc,
				id: defaultId
			});
			this.props.dispatch({
				type: 'main_data/fetch'
			});
		}else{
			userName = Cookies.get('userName');
			id = Cookies.get('id');
			login = Cookies.get('login');
			console.log("in www id& login", id, login);
			if(login === "1"){
				//已经登录
				this.props.dispatch({
					type: 'user/setUserName',
					userName: userName,
					id: id
				});
				this.props.dispatch({
					type: 'main_data/fetch'
				});
			}else if(login === "0"){
				//未登录
				// routerRedux.push('/login');
				this.props.dispatch(routerRedux.push('/login'));
			}else if(login === undefined){
				//未登录
				// routerRedux.push('/login');
				this.props.dispatch(routerRedux.push('/login'));
			}
		}
	}
	static propTypes = {  
	    products: PropTypes.array.isRequired  
	}
	handleClick(e) {
		console.log(e);
		const _this = this;
		_this.props.dispatch({
			type: 'main_data/fetch'
		});
		_this.props.dispatch({
	      type: 'pro/fetch',
	      payload: [{ name: 'init', id: 1, key: 1 },
            { name: 'init', id: 2, key: 2 },
            { name: 'init', id: 3, key: 3 },
            { name: 'init', id: 4, key: 4 },
            { name: 'init', id: 5, key: 5 },
          ]
	    });
	}
	render() {
		return (
			<div>
			{/*
				<h1>{this.props.products.length}</h1>
				<Button type="primary" onClick={this.handleClick}>Primary</Button>
			*/}
			</div>
		)
	}
}
let XXXC = connect(({ pro }) => ({
  products: pro,
}))(XXX);
// let FrameConnected = connect(({ pro }) => ({
//   products: pro,
// }))(Frame);

function RouterConfig({ history }) {
	const Admin = ({ match }) => (
		<div>
		</div>
	)
	const handleEnter = (a, b, c) => {
		console.log('handleEnter', a, b, c);
	}
	const Top = ({ match }) => (
		<div>
			{/*<Frame>*/}
			<XXXC></XXXC>
			{/*<Route path="/" component={Admin_products} match={match} />*/}
			<Route path="/login" component={Login} match={match} />
			<Route path="/register" component={Register} match={match} />
			<Route path="/changePSD" component={ChangePSD} match={match} />
			<Route path="/admin/message" component={Admin_message} match={match} />
			<Route path="/admin/products" component={Admin_products} match={match} />
			<Route path="/admin/contact" component={Admin_contact} match={match} />
			<Route path="/company/message" component={Company_message} match={match} />
			<Route path="/company/products" component={Company_products} match={match} />
			<Route path="/company/contact" component={Company_contact} match={match} />
		{/*</Frame>*/}
		</div>
	)
  return (
	<Router history={history}>
		<div>
			<Route path="/" component={Top}></Route>
			{/*
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/admin/message" component={Admin_message} />
				<Route path="/admin/products" component={Admin_products} />
				<Route path="/admin/contact" component={Admin_contact} />
				<Route path="/company/message" component={Company_message} />
				<Route path="/company/products" component={Company_products} />
				<Route path="/company/contact" component={Company_contact} />
			*/}
		</div>
	</Router>
	  
	
  );
}

export default RouterConfig;
