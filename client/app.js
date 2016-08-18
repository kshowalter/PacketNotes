import seedrandom  from 'seedrandom';

//import redux from 'redux';
var redux =require('redux');
import SpecDOM  from 'specdom';

import ActionDispatcher from './lib/action_dispatcher';

import actionMakers from './store/actionMakers';
import initState from './store/initState';
import reducer from './store/reducer';
import uiMaker from './uiMaker';

import keyboardInput from './keyboardInput';

//import configureStore from './redux/configureStore';

var store = redux.createStore(reducer, initState);
var actionDispatcher = ActionDispatcher(store, actionMakers);

keyboardInput(actionDispatcher);

//window.global = window;
//window._ = require('lodash');
//window.storage = sessionStorage;
//var g = window.g = {};
//
//g.rand = seedrandom('bean&owl');
//g.path = __dirname;



window.onload = function(){
  var view = SpecDOM('#content');

  store.subscribe(function(){
    var state = store.getState();
    console.log('State change: ', state);

    var uiConfig = uiMaker(state, actionDispatcher);
    view.load( uiConfig );
  });

  //window.setInterval(function(){
  //  actionDispatcher.updateTime();
  //}, 1000);

  actionDispatcher.addNote('this is a #test');
  actionDispatcher.addNote('this is also #test #second_chance');
  actionDispatcher.addNote('this is note a test');
};
