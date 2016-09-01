import moment from 'moment';
import _ from 'lodash';
import updeep from 'updeep';

var tagMarkers = ['#','@'];

var r = {};

var indexWord = function indexWord(indexLevel, subString, word){
  var letter = subString.slice(0,1);
  var remains = subString.slice(1);

  if( ! indexLevel[letter] ){
    indexLevel[letter] = {
      words: new Set(),
      letters: {}
    };
  }

  indexLevel[letter].words.add(word);

  if( remains ){
    indexWord(indexLevel[letter].letters, remains, word);
  }

};

var getIndex = function getIndex(indexLevel, string){
  var letter = string.slice(0,1);
  var remains = string.slice(1);

  if( indexLevel[letter] ){
    if( remains.length ){
      var nextLevelDown = getIndex(indexLevel[letter], remains);
      if( nextLevelDown ){
        return nextLevelDown;
      } else {
        return indexLevel[letter].words;
      }
    } else {
      return indexLevel[letter].words;
    }
  } else {
    return false;
  }
};

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

    if( ! state.words[word] ){
      state.words[word] = new Set();
    }
    state.words[word].add(newNote.id);
    indexWord(state.index, newNote.text, newNote.id);

  });


  newNote.words.forEach(function(word){
  });

  //var words = [...state.words];


  state.notes = [...state.notes, newNote];
  //state.words = words;

  return state;
};


var updateFilter = function(state,action){
  var selectedTags = [];

  for(var tagName in state.filter.tags ){
    if( state.filter.tags[tagName].selected ){
      selectedTags.push(tagName);
    }
  }

  var searchStrings = state.filter.searchString.split(' ');

  var searchWords = [].concat( selectedTags, state.filter.searchString.split(' ') );

  searchWords = _.filter(searchWords, function(word){
    return word !== '';
  });

  state.filter = Object.assign({}, state.filter, {
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
  if( state.ui.focus === 'searchInput'){
    state.ui = Object.assign({}, state.ui, {
      focus: state.ui.focusLast
    });
  } else {
    state.ui = Object.assign({}, state.ui, {
      focus: 'searchInput',
      focusLast: state.ui.focus
    });
  }
  return state;
};

r.moveFocus = function(state, action){
  var direction = action.direction;
  if( direction === 'Down' && state.ui.focus === 'notes' ){
    var newNum = state.ui.focusNum +1;
    if( newNum < state.ui.displayedNotes.length+1 ){
      state.ui = Object.assign({}, state.ui, {
        focusNum: state.ui.focusNum +1
      });
    }
  } else if( direction === 'Down' && state.ui.focus === 'searchInput' ){
    state.ui = Object.assign({}, state.ui, {
      focus: 'notes',
      focusNum: 1
    });
  } else if( direction === 'Up' && state.ui.focus === 'notes' ){
    var newNum = state.ui.focusNum -1;
    if( newNum <= 0 ){
      state.ui = Object.assign({}, state.ui, {
        focus: 'searchInput',
        focusLast: state.ui.focus
      });
    } else {
      state.ui = Object.assign({}, state.ui, {
        focusNum: newNum
      });
    }
  }
  return state;
};

r.toggleInputMode = function(state,action){
  state.ui.inputMode = state.ui.inputMode === '_ search' ? '+ add' : '_ search';

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
  var displayedNotes = [];
  if( state.filter.searchWords.length ){
    displayedNotes = [];
    state.notes.forEach(function(note,id){
      // if all the searchWords are in note.words, then the intersection will contain all of the searchWords.
      if( _.intersection( note.words, state.filter.searchWords ).length === state.filter.searchWords.length ){
        displayedNotes.push(id);
      }
    });
  } else {
    displayedNotes = _.keys(state.notes);
  }
  //state.ui.displayedNotes = displayedNotes;
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
    if( state.ui.focus === 'searchInput' ){
      var inputElement = document.getElementsByClassName('searchInput')[0];
      var inputString = inputElement.value;
      state = r.addNote(state,{
        type: 'addNote',
        text: inputString
      });
      state.filter.searchString = '';
      state = updateFilter(state,action);
      //inputElement.value = '';
    } else {
      console.log('Now what?');
    }

  } else {
    console.log('I do not know how to: ', action);
    return existingState;
  }

  state.ui.displayedNotes = updateDisplayedNotes(state, action);

  state = updeep(state, existingState);

  return state;
}

export default reducer;
