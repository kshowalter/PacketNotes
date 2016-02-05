var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

import {
  test,
  addNote,
  selectTag,
  updateSearchString
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */



var Button = React.createClass({
  render: function(){
    console.log(this.props);
    return (
      <span className={this.props.buttonClass} onClick={this.props.cb}>
        {this.props.children}
      </span>
    );
  }
});

var ButtonLi = React.createClass({
  click: function(e){
    //console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <li className={this.props.buttonClass} onClick={this.click}>
        {this.props.name}
      </li>
    );
  }
});

var TopBar = React.createClass({
  updateSearchString: function(e){
    console.log(e, e.target.value);
    var searchString = e.target.value;
    this.props.actions.updateSearchString(searchString);
  },
  render: function(){
    return (
      <div className='TopBar'>
        <input type='text' value={this.props.searchString} onInput={this.updateSearchString}></input>
        <span className='TopBarRight'>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {this.props.updateTime}
          &nbsp;&nbsp;
          {this.props.count}
        </span>
      </div>
    );
  }
});


var Note = React.createClass({
  selectTag: function(e){
    console.log(e.target.innerHTML);
    //var actions = this.props.actions;
    var tag = e.target.innerHTML;
    this.props.actions.selectTag(tag);

  },
  render: function(){
    //console.log(this.props);
    return (
      <div className='Note'>
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
      </div>
    );
  }
});

var Notes = React.createClass({
  render: function(){
    //console.log(this.props);
    var actions = this.props.actions;
    return (
      <div className='Notes'>
        {this.props.displayedNotes.map(function(noteId,id) {
          var note = this.props.notes[noteId];
          return <Note note={note} key={id} actions={actions}/>;
        },this)}
      </div>
    );
  }
});

var AddNoteBar = React.createClass({
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
      <div className='AddNoteBar'>
        <input type='text' id='noteInput'></input>
        <Button buttonClass='button' cb={this.addNote}>
          <i className='fa fa-plus'></i>
        </Button>
      </div>
    );
  }
});



var TagSideBar = React.createClass({
  selectTag: function(tag){
    console.log(this.props, tag);
    this.props.actions.selectTag(tag);
  },
  render: function(){
    return (
      <div className='TagSideBar'>
        <ul>
          { _.keys(this.props.tags).map(function(tagName,id){
            console.log(this.props.tags[tagName].selected);
            var tagClass = 'tagButton';
            if(this.props.tags[tagName].selected){
              tagClass = 'tagButtonSelected';
            }
            return (
              <ButtonLi key={id} buttonClass={tagClass} name={tagName} cb={this.selectTag} />
            );
          },this)}
        </ul>
      </div>
    );
  }
});

var ReactView = React.createClass({
  test: function(input){
    console.log('test');
    this.props.dispatch(test(input));
  },
  componentWillUpdate: function(nextProps){
    //console.log('view will update', this.props.universe.count);
  },
  render: function(){
    //console.log('view update', this.props);
    const { dispatch } = this.props;
    //const time = this.props.time;
    //var dispatch = this.props.dispatch;
    var actions = {
      addNote: function(text){
        dispatch(addNote(text));
      },
      selectTag: function(tag){
        dispatch(selectTag(tag));
      },
      updateSearchString: function(searchString){
        dispatch(updateSearchString(searchString));
      }
    };
    return (
      <div className='App'>
        <TopBar
          searchString={this.props.filter.searchString}
          actions={actions}
          updateTime={this.props.updateTime}
          count={this.props.count}
          />
        <div className='mainSection'>
          <TagSideBar tags={this.props.filter.tags} actions={actions} />
          <div className='flexSection'>
            <AddNoteBar actions={actions} />
            <Notes notes={this.props.notes} displayedNotes={this.props.displayedNotes} actions={actions} />
          </div>
        </div>
      </div>
    );
  }
});

export default ReactView;
