import _ from 'lowdash';

import {div, span, a, ul, li, br, h1, h2, h3} from 'specdom_helper';

import {
  test,
  addNote,
  selectTag,
  updateSearchString
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */



var Button = function(){
  render: function(){
    //console.log(this.props);
    return (
      <span class={this.props.buttonClass} onClick={this.props.cb}>
        {this.props.children}
      </span>
    );
  }
});

var ButtonLi = function(){
  click: function(e){
    //console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <li class={this.props.buttonClass} onClick={this.click}>
        {this.props.name}
      </li>
    );
  }
});

var TopBar = function(){
  updateSearchString: function(e){
    console.log(e, e.target.value);
    var searchString = e.target.value;
    this.props.actions.updateSearchString(searchString);
  },
  render: function(){
    return (
      div( {class='TopBar'}, [

      ])
        <input id='searchInput' type='text' value={this.props.searchString} onInput={this.updateSearchString}></input>
        <span class='TopBarRight'>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {this.props.updateTime}
          &nbsp;&nbsp;
          {this.props.count}
        </span>
    );
  }
});


var Note = function(){
  selectTag: function(e){
    console.log(e.target.innerHTML);
    //var actions = this.props.actions;
    var tag = e.target.innerHTML;
    this.props.actions.selectTag(tag);

  },
  render: function(){
    //console.log(this.props);
    return (
      div( {class='Note'}, [

      ])
        {this.props.note.words.map(function(word,id){
          if( this.props.note.tags.indexOf(word)+1 ){
            return (
              <span key={id}>
                <a href='#' onClick={this.selectTag}>{word}</a>
                &nbsp;
              </span>
            );
          } else {
            return (
              <span key={id}>
                {word}
                &nbsp;
              </span>
            );
          }
        }, this)}
    );
  }
});

var Notes = function(){
  render: function(){
    //console.log(this.props);
    var actions = this.props.actions;
    return (
      div( {class='Notes'}, [

      ])
        {this.props.displayedNotes.map(function(noteId,id) {
          var note = this.props.notes[noteId];
          return <Note note={note} key={id} actions={actions}/>;
        },this)}
    );
  }
});

var AddNoteBar = function(){
  addNote: function(e){
    var newNote = document.getElementById('noteInput').value;
    document.getElementById('noteInput').value = '';
    console.log(newNote);
    if( newNote !== '' ){
      this.props.actions.addNote(newNote);
    }
  },
  render: function(){
    return (
      div( {class='AddNoteBar'}, [

      ])
        <input type='text' id='noteInput'></input>
        <Button buttonClass='button' cb={this.addNote}>
          <i class='fa fa-plus'></i>
        </Button>
    );
  }
});



var TagSideBar = function(){
  var selectTag = function(tag){
    //console.log(this.props, tag);
    this.props.actions.selectTag(tag);
  },
  return (
    div( {class:'TagSideBar'}, [
      ul( _.keys(arguments.tags).map(function(tagName,id){
          var tagClass = 'tagButton';
          if(this.props.tags[tagName].selected){
            tagClass = 'tagButtonSelected';
          }
          return (
            <ButtonLi key={id} buttonClass={tagClass} name={tagName} cb={this.selectTag} />
          );
        },this)
      ]
    ])
  );
});

var view = function(state, actions){
  return div( {class:'App'}, [
    TopBar({
      searchString: this.props.filter.searchString,
      actions: actions,
      updateTime: this.props.updateTime,
      count: this.props.count
    }),
    div( {class:'mainSection'}, [
      TagSideBar( {tags:this.props.filter.tags, actions:actions }),
      div( {class:'flexSection'}, [
        AddNoteBar({ actions:actions }),
        Notes( {notes:this.props.notes, displayedNotes:this.props.displayedNotes, actions:actions })
      ])
    ])
  ])
};

export default view;
