import { combineReducers } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import {
  ADD_ITEM,
  SELECT_TAG,
  UPDATE_SEARCH_STRING
} from './actions';

var tagMarkers = ['#','@'];

var addItem = function(state,action){
  var newNote = {
    text: action.text,
    words: action.text.split(),
    tags: [],
    status: 'active'
  };
  newNote.words.forEach(function(word){
    if( tagMarkers.indexOf(word[0])+1 ){
      newNote.tags.push(word);
    }
  });

  return Object.assign({}, state, {
    notes: [
      ...state.notes,
      newNote
    ]
  });

};


var selectTag = function(state,action){
  var tags = [...state.tags];
  var tagIndex = tags.indexOf(action.tag);

  if( tagIndex+1 ){
    _.pullAt(tags, tagIndex);
  } else {
    tags.push(action.tag);
  }

  var searchParams = Object.assign({},state,{
    tags: tags,
    searchWords: state.textWords.concat( tags )
  });
  return searchParams;
};

var updateSearchString = function(state,action){
  var searchString = action.searchString;

  var searchParams = Object.assign({},state,{
    searchString: searchString,
    textWords: searchString.split(' '),
    searchWords: state.searchParams.tags.concat( searchString.split(' ') )
  });
  return searchParams;
};

var updateDisplayedNotes = function(state,action){
  if( state.searchParams.searchWords.length ){
    var displayedNotes = [];
    state.notes.forEach(function(note,id){
      var matches = _.intersection( note.words, state.searchParams.tags  );
      if( matches.length ){
        displayedNotes.push(id);
      }
    });
  } else {
    displayedNotes = _.keys(state.notes);
  }
  return displayedNotes;
};

//var initialize = function(state,action){
//  state = Object.assign({}, state, {
//    displayedNotes: updateDisplayedNotes(state, action)
//  });
//
//
//  return state;
//};

function reducer( state={}, action ){
  //console.log('Action: ', action);
  state = Object.assign({}, state, {
    count: state.count + 1,
    updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
  });

  if( ! action ){
    return state;
  }



  if( action.type === ADD_ITEM ){
    state = Object.assign({}, state, {
      notes: addItem(state.notes, action)
    });
  }
  if( action.type === SELECT_TAG ){
    state = Object.assign({}, state, {
      searchParams: selectTag(state.searchParams, action)
    });
  }
  if( action.type === UPDATE_SEARCH_STRING ){
    state = Object.assign({}, state, {
      searchParams: updateSearchString(state.searchParams, action)
    });
  }

  state = Object.assign({}, state, {
    displayedNotes: updateDisplayedNotes(state, action)
  });


  return state;


}

export default reducer;
