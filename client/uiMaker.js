import _ from 'lodash';

import {div, span, p, a, ul, li, br, h1, h2, h3, input} from 'specdom_helper';

var Button = function(buttonClass, cb, children){
  return span(
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
    input({
      id: 'searchInput',
      type: 'text',
      value: state.filter.searchString,
      oninput: function(e){
        console.log(e, e.target.value);
        var searchString = e.target.value;
        actionDispatcher.updateSearchString(searchString);
      }
    }),
    span({class:'TopBarRight'},[
      '  ',
      state.updateTime
    ])
  ]);
};


var Note = function(note, actionDispatcher){
  var notes = note.words.map(function(word,id){
    if( note.tags.indexOf(word)+1 ){
      return span({key:id},[
        a(word,'#', {
          onclick: function(e){
            console.log(e.target.innerHTML);
            //var actions = this.props.actions;
            var tag = e.target.innerHTML;
            actionDispatcher.selectTag(tag);
          }
        }),
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
    div( {class: 'Note'}, notes )
  );
};


var Notes = function(state, actionDispatcher){
  var notes = state.displayedNotes.map(function(noteId,id){
    var note = state.notes[noteId];
    return Note(note, actionDispatcher);
  });
  return div( {class:'Notes'}, notes);
};

var AddNoteBar = function(actionDispatcher){
  return div( {class:'AddNoteBar'}, [
    input({
      type: 'text',
      id: 'noteInput'
    }),
    Button(
      'button',
      function(e){
        var newNote = document.getElementById('noteInput').value;
        document.getElementById('noteInput').value = '';
        console.log(newNote);
        if( newNote !== '' ){
          actionDispatcher.addNote(newNote);
        }
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
        AddNoteBar(actionDispatcher),
        Notes( state, actionDispatcher)
      ])
    ])
  ]);
};

export default view;
