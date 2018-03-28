import React from 'react';
import Frame from '../assets/Frame';
import { connect } from 'dva';

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<Frame {...this.props}>
		      <p>{ this.props.user.acc }</p>
		    </Frame>
		)
	}
}


export default connect(({ user }) => ({
  user: user,
}))(Example);
