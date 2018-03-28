import React from 'react';
import Frame from '../assets/Frame';
import { connect } from 'dva';

const Example = () => {
  return (
    <Frame {...this.props}>
      <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/goods.png" />
    	<div style={{ clear: "both" }}>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw1.png" />
        </div>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw2.png" />
        </div>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw3.png" />
        </div>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw4.png" />
        </div>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw5.png" />
        </div>
        <div style={{ float: "left", margin: "20px 100px 20px 100px", height: "200px" }}>
          <img class="con_img" src="https://www.dapingkeji.com/ostro_dapingkeji/image/tw6.png" />
        </div>
        <div style={{clear: "both"}}></div>
      </div>
    </Frame>
  );
};

Example.propTypes = {
};

export default connect(({ user }) => ({
  user: user,
}))(Example);
