//import seedrandom  from 'seedrandom';
import Chance from 'chance';

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
var chance = new Chance('bean&owl');

import Words from './info/wordlist';
var words = Words();

var sentenceWithTags = function(tags){
  var wordList = _.times( chance.integer({min:5, max:20}) , function(){
    //var word = chance.word();
    var word = chance.pickone(words.random);
    var f = chance.floating({min:0,max:1});
    if( f <= 0.01 ){
      word = '#' + word;
      tags.push(word);
      return word;
    } else if( f<= 0.2) {
      if(tags.length){
        return chance.pickone(tags);
      } else {
        word = '#' + word;
        tags.push(word);
        return word;
      }
    } else {
      return word;
    }
  });
  return wordList.join(' ');
};

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
document.addEventListener('build', function(e){
  console.log(e);
}, false);


window.onload = function(){
  var view = SpecDOM('#content');

  store.subscribe(function(){
    var state = store.getState();
    console.log('State change: ', {newState:state});

    var uiConfig = uiMaker(state, actionDispatcher);
    view.load( uiConfig );

    var focusElement;
    if( state.ui.focus === 'notes' ){
      var num = state.ui.focusNum;
      focusElement = document.getElementsByClassName('Note')[num-1];
      focusElement.className += ' NoteSelected';
    } else if( state.ui.focus === 'searchInput' ){
      focusElement = document.getElementsByClassName('searchInput')[0];
      focusElement.className += ' searchInputFocused';
      focusElement.focus();
      focusElement.scrollIntoView();
      focusElement.value = focusElement.value;
    } else {
      focusElement = document.getElementById(state.ui.focus);
      console.log('I do not know how to focus on "' + state.ui.focus + '"');
    }
  });

  //window.setInterval(function(){
  //  actionDispatcher.updateTime();
  //}, 1000);

  window.setTimeout(function(){
    actionDispatcher.addNote('this is a #test');
    actionDispatcher.addNote('this is also #test #second_chance');
    actionDispatcher.addNote('this is note a test');
    actionDispatcher.addNote('the quick brown fox jumps over the lazy #dog');
    var tags = [];
    var randNote = function randNote(count){
      if(count>0){
        actionDispatcher.addNote( sentenceWithTags(tags) );
        window.setTimeout(randNote,0,count-1);
      }
    };
    randNote(20);
  }, 1000);


};
