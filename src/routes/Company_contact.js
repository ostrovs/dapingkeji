import React from 'react';
import Frame from '../assets/Frame';
import { connect } from 'dva';

const Example = () => {
  return (
    <Frame {...this.props}>
      <p>
      公司业务联系方式：
		丁先生：13920686130
		刘先生：18722564170

      </p>

      <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/contact.png" />
      
    </Frame>
  );
};

Example.propTypes = {
};

export default connect(({ user }) => ({
  user: user,
}))(Example);
