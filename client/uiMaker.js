import _ from 'lodash';

import {div, span, p, a, ul, li, br, h1, h2, h3, input} from 'specdom_helper';

var Button = function(text, buttonClass, cb, children){
  return span(
    text,
    {
      class: buttonClass,
      onclick: cb
    },
    [
      children
    ]
  );
};

var ButtonLi = function(key, buttonClass, name, cb){
  return li(
    {
      class: buttonClass,
      onclick: function(e){
        cb(name);
      }
    },
    [
      name
    ]
  );
};

var TopBar = function(state, actionDispatcher){
  return div({class: 'TopBar'}, [
    span({class:'TopBarRight'},[
      '  ',
      state.updateTime
    ])
  ]);
};


var Note = function(props){
  var notes = props.note.words.map(function(word,id){
    if( props.note.tags.indexOf(word)+1 ){
      return span({key:id},[
        a(word,'#', {
          onclick: function(e){
            console.log(e.target.innerHTML);
            //var actions = this.props.actions;
            var tag = e.target.innerHTML;
            props.actionDispatcher.selectTag(tag);
          }
        }),
        ' '
      ]);
    } else if( props.searchWords.indexOf(word)+1 ){
      return span({
        key:id,
        class: 'wordHighlight'
      },[
        word,
        ' '
      ]);
    } else {
      return span({key:id},[
        word,
        ' '
      ]);
    }
  });

  return (
    div( {class: props.className}, notes )
  );
};


var Notes = function(state, actionDispatcher){
  var notes = state.ui.displayedNotes.map(function(noteMatch,id){
    var note = state.notes[noteMatch.noteId];
    console.log(noteMatch, note);
    var className;
    if( noteMatch.completeness === 'full' ){
      className = 'Note';
    } else  if( noteMatch.completeness === 'partial' ){
      className = 'Note NotePartial';
    }
    return Note({
      note: note,
      className: className,
      searchWords: state.filter.searchWords,
      actionDispatcher: actionDispatcher
    });

  });

  return div( {class:'Notes'}, notes);
};

var AddNoteBar = function(state, actionDispatcher){
  return div( {class:'AddNoteBar'}, [
    input({
      class: 'searchInput',
      type: 'text',
      value: state.filter.searchString,
      oninput: function(e){
        var searchString = e.target.value;
        actionDispatcher.updateSearchString(searchString);
      }
    }),
    Button(
      state.ui.inputMode,
      'button',
      function(e){
        var newNote = document.getElementById('searchInput').value;
        document.getElementById('searchInput').value = '';
        console.log(newNote);
        if( newNote !== '' ){
          actionDispatcher.addNote(newNote);
        }
        /////
        var event = new Event('build');
        document.dispatchEvent(event);
        /////
      }
    )
  ]);
};



var TagSideBar = function(tags, actionDispatcher){
  return div( {class:'TagSideBar'}, [
    ul( _.keys(tags).map(function(tagName,id){
      var tagClass = 'tagButton';
      if(tags[tagName].selected){
        tagClass = 'tagButtonSelected';
      }
      return ButtonLi(id, tagClass, tagName,
        function(tag){
          actionDispatcher.selectTag(tag);
        }
      );
    }))
  ]);
};


var view = function(state, actionDispatcher){
  return div( {class:'App'}, [
    TopBar(state, actionDispatcher),
    div( {class:'mainSection'}, [
      TagSideBar( state.filter.tags, actionDispatcher),
      div( {class:'flexSection'}, [
        AddNoteBar(state, actionDispatcher),
        Notes( state, actionDispatcher)
      ])
    ])
  ]);
};

export default view;
