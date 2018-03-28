import React from 'react';
import Frame from '../assets/Frame';
import { connect } from 'dva';

const Example = () => {
  return (
    <Frame {...this.props}>
      <p>
        天津大萍科技有限公司是一家由年轻人创建集微信小程序开发、微信公众号开发及运营、网页制作、网站建设的科技型公司。公司位于南开区长江道92号C92创意集聚区。公司秉承着“再小的个体也有自己的品牌”，为 各行各业的人们制作专属的微信平台。
      </p>
      <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/con.png" />
      <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/con_run.png" />
      
    </Frame>
  );
};

Example.propTypes = {
	
};

export default connect(({ user }) => ({
  user: user,
}))(Example);
