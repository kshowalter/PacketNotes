import 'babel-polyfill';
import io from 'socket.io-client';
import seedrandom  from 'seedrandom';

import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as ReactDOM from 'react-dom';

//import Immutable from 'immutable';

window.global = window;
window._ = require('lodash');
window.storage = sessionStorage;
window.g = {};

var socket = io();
g.socket = socket;
g.rand = seedrandom('bean&owl');
g.path = __dirname;


socket.on('connect', function(){
  console.log('connected to server');

  console.log('browser says: hi');
  socket.emit('test', 'hi', function(msg){
    console.log('server says:', msg);
  });
});


import ReactView from './components/view.js';
import reducer from './redux/reducer.js';

import {
  test,
  initialize,
  addNote
} from './redux/actions';


//const createStoreWithMiddleware = applyMiddleware(
//  thunkMiddleware, // lets us dispatch() functions
//  loggerMiddleware // neat middleware that logs actions
//)(createStore);


import configureStore from './redux/configureStore';

import initState from './initState';
//var initStateImmutable = Immutable.fromJS(initState);
//let store = configureStore(initStateImmutable);

let store = configureStore(initState);


var select = function(state) {
  return state;
};

var View = connect(select)(ReactView);

ReactDOM.render(
  <Provider store={store}>
    <View />
  </Provider>,
  document.getElementById('content')
);

store.dispatch(initialize());
store.dispatch(test());

document.onkeypress = function (e) {
  e = e || window.event;
  // use e.keyCode
  console.log('key', e.code);
  if( e.code == 'Enter'){
    var newNote = document.getElementById('noteInput').value;
    store.dispatch(addNote(newNote));

    document.getElementById('noteInput').value = '';
  }
  document.getElementById('noteInput').focus();
};
