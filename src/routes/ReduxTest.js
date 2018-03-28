import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const store = createStore(()=>null);
// const store = createStore(reducer);

// export default class test extends Component(){
// 	constructor(props) {
// 	    super(props);
// 	}
// 	render(){
// 		return (
// 			<div>
// 	   			<h2>List of Products</h2>
// 	   		</div>
// 		)
// 	}
// }

const Counter = ({ value }) => (
  <h1>{value}<span>xxxx</span></h1>
);

const render = () => {
  ReactDOM.render(
    <Counter value={55}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

export default Counter;