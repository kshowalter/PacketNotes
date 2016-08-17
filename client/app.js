import io from 'socket.io-client';
import seedrandom  from 'seedrandom';

//import redux from 'redux';
var redux =require('redux');
console.log(redux);
import Router from 'hash_router';
import SpecDOM  from 'specdom';

import ActionDispatcher from './lib/action_dispatcher';

import actionMakers from './store/actionMakers';
import initState from './store/initState';
import reducer from './store/reducer';
import uiMaker from './uiMaker';

//import configureStore from './redux/configureStore';

var store = redux.createStore(reducer, initState);
var actionDispatcher = ActionDispatcher(store, actionMakers);
var socket = io();

window.global = window;
window._ = require('lodash');
window.storage = sessionStorage;
var g = window.g = {};

g.socket = socket;
g.rand = seedrandom('bean&owl');
g.path = __dirname;

socket.on('connect', function(){

  console.log('browser says: hi');
  socket.emit('test', 'hi', function(msg){
    console.log('server says:', msg);
  });
});

actionDispatcher.initialize();
actionDispatcher.addNote('this is a #test');
actionDispatcher.addNote('this is also #test #second_chance');
actionDispatcher.addNote('this is note a test');

document.onkeypress = function (e) {
  e = e || window.event;
  // use e.keyCode
  //console.log(e, 'key', e.code);
  if( e.code == 'Enter'){
    var newNote = document.getElementById('noteInput').value;
    store.dispatch(addNote(newNote));

    document.getElementById('noteInput').value = '';
    document.getElementById('noteInput').focus();
  }
};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ( 'key' in evt ) {
    isEscape = evt.key == 'Escape';
  } else {
    isEscape = evt.keyCode == 27;
  }
  if (isEscape) {
    document.getElementById('searchInput').focus();
  }
};


window.onload = function(){

  var view = SpecDOM('#content');

  store.subscribe(function(){
    var state = store.getState();
    console.log('State change: ', state);

    var uiConfig = uiMaker(state, actionDispatcher);
    view.load( uiConfig );
  });

  actionDispatcher.selectPage(initState.defaultPage);

  var router = Router(function(location){
    actionDispatcher.selectPage(location);
  });

};
