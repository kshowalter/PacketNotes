import moment from 'moment';
import _ from 'lodash';

var tagMarkers = ['#','@'];

var addNote = function(state,action){
  var id = ++state.LastNoteId;

  var newNote = {
    id: id,
    text: action.text,
    words: action.text.split(' '),
    tags: [],
    status: 'active'
  };

  newNote.words.forEach(function(word){
    if( tagMarkers.indexOf(word[0])+1 ){
      newNote.tags.push(word);
      if( ! state.filter.tags[word] ){
        state.filter.tags = Object.assign({}, state.filter.tags, {
          [word]: {selected: false}
        });
      }
    }
  });

  var words = [...state.words];

  newNote.words.forEach(function(word){
    if( ! words[word] ){
      words[word] = [id];
    } else {
      words[word].push(id);
    }
  });

  state.notes = [...state.notes, newNote];
  state.words = words;

  return state;
};


//var selectTag = function(state,action){
//  var tags = Object.assign({},state);
//
//  tags[action.tag].selected = ! tags[action.tag].selected;
//
//  return tags;
//};

/*
var selectTag = function(state,action){
  var tags = [...state.tags];

  var tagIndex = tags.indexOf(action.tag);

  if( tagIndex+1 ){
    _.pullAt(tags, tagIndex);
  } else {
    tags.push(action.tag);
  }

  var searchParams = Object.assign( {}, state, {
    tags: tags,
    searchWords: state.textWords.concat( tags )
  });
  return searchParams;
};
*/

/*
var updateSearchString = function(state,action){
  var searchString = action.searchString;

  var searchParams = Object.assign({},state,{
    searchString: searchString,
    textWords: searchString.split(' '),
    searchWords: state.searchParams.tags.concat( searchString.split(' ') )
  });
  return searchParams;
};
*/

var updateFilter = function(filter,action){
  if( action.type === 'selectTag' ){
    filter.tags = Object.assign({}, filter.tags);
    filter.tags[action.tag].selected = ! filter.tags[action.tag].selected;
  } else if( action.type === 'updateSearchString' ){
    filter = Object.assign({}, filter, {
      searchString: action.searchString
    });
  }

  var selectedTags = [];

  for(var tagName in filter.tags ){
    if( filter.tags[tagName].selected ){
      selectedTags.push(tagName);
    }
  }

  var searchWords = [].concat( selectedTags, filter.searchString.split(' ') );

  searchWords = _.filter(searchWords, function(word){
    return word !== '';
  });

  filter = Object.assign({}, filter, {
    searchWords: searchWords,
    selectedTags: selectedTags
  });

  return filter;
};


var updateDisplayedNotes = function(state, action){
  if( state.filter.searchWords.length ){
    var displayedNotes = [];
    state.notes.forEach(function(note,id){
      var matches = _.intersection( note.words, state.filter.searchWords );
      if( matches.length ){
        displayedNotes.push(id);
      }
    });
  } else {
    displayedNotes = _.keys(state.notes);
  }
  //state.displayedNotes = displayedNotes;
  return displayedNotes;
};

var toggleSearchFocus = function(state){
  if( state.focus === 'searchInput'){
    state = Object.assign({}, state, {
      focus: state.focusLast
    });
  } else {
    state = Object.assign({}, state, {
      focus: 'searchInput',
      focusLast: state.focus
    });
  }
  return state;
};

var moveFocus = function(state, action){
  var direction = action.direction;
  if( direction === 'Down' && state.focus === 'notes' ){
    var newNum = state.focusNum +1;
    if( newNum < state.displayedNotes.length+1 ){
      state = Object.assign({}, state, {
        focusNum: state.focusNum +1
      });
    }
  } else if( direction === 'Down' && state.focus === 'searchInput' ){
    state = Object.assign({}, state, {
      focus: 'notes',
      focusNum: 1
    });
  } else if( direction === 'Up' && state.focus === 'notes' ){
    var newNum = state.focusNum -1;
    if( newNum <= 0 ){
      state = Object.assign({}, state, {
        focus: 'searchInput',
        focusLast: state.focus
      });
    } else {
      state = Object.assign({}, state, {
        focusNum: newNum
      });
    }
  }
  return state;
};

var r = {};

r.toggleInputMode = function(state,action){
  state.inputMode = state.inputMode === '_ search' ? '+ add' : '_ search';

  return state;
};


function reducer( existingState={}, action ){
  if( ! action ){
    return existingState;
  }

  var state = _.cloneDeep(existingState);

  if( [
    'toggleInputMode'
  ].indexOf(action.type)+1 ){
    console.log('Reducing', action);
    state = r[action.type](state,action);
  } else if( action.type === 'toggleSearchFocus'){
    state = toggleSearchFocus(state);

  } else if(action.type=== 'moveFocus' ){
    state = moveFocus(state,action);

  } else if(action.type=== 'enterKey' ){
    console.log('Now what?');

  } else if(action.type=== 'addNote' ){
    state = addNote(state,action);

  } else if(action.type=== 'updateSearchString' || action.type=== 'selectTag' ){
    state.filter = updateFilter(state.filter, action);

  } else if(action.type=== 'updateTime' ){
    state.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  } else if(action.type=== 'element_id' ){
    state.focus = action.elementId;

  } else if( action.type.slice(0,2) === '@@' ){
    console.log('Ignoring: ', action);
    return existingState;

  } else {
    console.log('I do not know how to: ', action);
    return existingState;
  }

  state.displayedNotes = updateDisplayedNotes(state, action);

  return _.merge({}, existingState, state);
}

export default reducer;
