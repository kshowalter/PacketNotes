var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

import {
  test,
  addItem,
  selectTag,
  updateSearchString
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */



var Button = React.createClass({
  click: function(e){
    //console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <span onClick={this.click}>{this.props.name}</span>
    );
  }
});

var TopBar = React.createClass({
  selectTag: function(tag){
    console.log(this.props);
    this.props.actions.selectTag(tag);
  },
  render: function(){
    return (
      <div className='TopBar'>
        <input type='text'></input>
        <span>
          {this.props.searchParams.tags.map(function(tag, id){
            return <Button className='tagButton' key={id} name={tag} cb={this.selectTag} />;
          }, this)}
        </span>
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

var NewNote = React.createClass({
  render: function(){
    return (
      <div className='NewNote'>
        <input type='textbox'></input>
      </div>
    );
  }
});

var TagSideBar = React.createClass({
  selectTag: function(tag){
    console.log(this.props);
    this.props.actions.selectTag(tag);
  },
  render: function(){
    return (
      <div className='TagSideBar'>
        <ul>
          { _.keys(this.props.tags).map(function(tagName,id){
            if(this.props.tags[tagName].selected){
              return (
                <li>
                  <Button className='tagButtonSelected' key={id} name={tagName} cb={this.selectTag} />
                </li>
              );
            } else {
              return (
                <li>
                  <Button className='tagButton' key={id} name={tagName} cb={this.selectTag} />
                </li>
              );
            }
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
      addItem: function(text){
        dispatch(addItem(text));
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
          searchParams={this.props.searchParams}
          actions={actions}
          updateTime={this.props.updateTime}
          count={this.props.count}
          />
        <div className='mainSection'>
          <TagSideBar tags={this.props.tags} actions={actions} />
          <div className='flexSection'>
            <NewNote actions={actions} />
            <Notes notes={this.props.notes} displayedNotes={this.props.displayedNotes} actions={actions} />
          </div>
        </div>
      </div>
    );
  }
});

export default ReactView;
