import moment from 'moment';
import _ from 'lodash';

var tagMarkers = ['#','@'];

var r = {};

r.addNote = function(state,action){
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


var updateFilter = function(state,action){
  var selectedTags = [];

  for(var tagName in state.filter.tags ){
    if( state.filter.tags[tagName].selected ){
      selectedTags.push(tagName);
    }
  }

  var searchWords = [].concat( selectedTags, state.filter.searchString.split(' ') );

  searchWords = _.filter(searchWords, function(word){
    return word !== '';
  });

  state = Object.assign({}, state, {
    searchWords: searchWords,
    selectedTags: selectedTags
  });

  return state;
};


r.selectTag = function(state,action){
  console.log(action)
  state.filter.tags = Object.assign({}, state.filter.tags);
  state.filter.tags[action.tag].selected = ! state.filter.tags[action.tag].selected;

  return updateFilter(state,action);
};

r.updateSearchString = function(state,action){
  state.filter = Object.assign({}, state.filter, {
    searchString: action.searchString
  });

  return updateFilter(state,action);
};





r.toggleSearchFocus = function(state,action){
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

r.moveFocus = function(state, action){
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

r.toggleInputMode = function(state,action){
  state.inputMode = state.inputMode === '_ search' ? '+ add' : '_ search';

  return state;
};

r.updateTime = function(state,action){
  state.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  return state;
};

r.updateTime = function(state,action){
  state.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  return state;
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

function reducer( existingState={}, action ){
  if( ! action ){
    return existingState;
  }

  var state = _.cloneDeep(existingState);

  if( action.type.slice(0,2) === '@@' ){
    console.log('Ignoring: ', action);
    return existingState;

  } else if( [
    'toggleInputMode',
    'addNote',
    'selectTag',
    'updateSearchString',
    'toggleSearchFocus',
    'moveFocus',
    'updateTime'
  ].indexOf(action.type)+1 ){
    state = r[action.type](state,action);

  } else if(action.type=== 'enterKey' ){
    console.log('Now what?');

  } else {
    console.log('I do not know how to: ', action);
    return existingState;
  }

  state.displayedNotes = updateDisplayedNotes(state, action);

  return _.merge({}, existingState, state);
}

export default reducer;
