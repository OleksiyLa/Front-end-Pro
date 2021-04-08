import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const list = [ { id: 'i_20', price: 2300, name: 'Example_1' }, { id: 'i_10', price: 1100, name: 'Example_2' }, { id: 'i_120', price: 7300, name: 'Example_3' }, { id: 'i_240', price: 2340, name: 'Example_4' },{ id: 'i_202', price: 2300, name: 'Example_5' }, { id: 'i_130', price: 1100, name: 'Example_6' }, { id: 'i_1120', price: 7300, name: 'Example_7' }, { id: 'i_2240', price: 2340, name: 'Example_8' }];

ReactDOM.render(
  <React.StrictMode>
    <App list={list}/>
  </React.StrictMode>,
  document.getElementById('root')
);
