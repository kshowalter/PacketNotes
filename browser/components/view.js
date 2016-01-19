var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

import {
  tick
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */



var Button = React.createClass({
  click: function(e){
    //console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <span className='Button' onClick={this.click}>{this.props.name}</span>
    );
  }
});

var Display_text = React.createClass({
  render: function(){
    return (
      <span>{this.props.text}</span>
    );
  }
});

var Time = React.createClass({
  render: function(){
    //console.log(this.props);
    var time = this.props.time;
    return (
      <span>Day: {time.day} - Time: {time.hour}:{time.minute}:{time.tick}</span>
    );
  }
});

var StatusBar = React.createClass({
  render: function(){
    return (
      <div className="StatusBar">
        <Time time={this.props.time}/>
        <Button name="tick" cb={this.props.tick} />
      </div>
    );
  }
});

var Component = React.createClass({
  render: function(){
    return (
      <span className="Component">{this.props.comp}</span>
    );
  }
});

var TitleBar = React.createClass({
  render: function(){
    return (
      <span className="TitleBar">
        Ship: {this.props.title}
      </span>
    );
  }
});

var Display = React.createClass({
  render: function(){
    var display = this.props.display;
    var subComponents = this.props.display.subComponents;
    console.log(this.props);
    return (
      <div className='Display'>
        <TitleBar title={display.title}></TitleBar>
        <div>
          {subComponents.map(function(compText, id) {
            return <Component comp={compText} key={id}/>;
          })}
        </div>
      </div>
    );
  }
});

var ReactApp = React.createClass({

  test: function(){
    console.log('test');
  },
  tick: function(){
    this.props.dispatch(tick());
  },
  componentWillUpdate: function(nextProps){
    //console.log('view will update', this.props.universe.count);
  },
  render: function(){
    console.log('view update', this.props);
    //const time = this.props.time;
    return (
      <div>
        <StatusBar time={this.props.UI.time} tick={this.tick} />
        <Display display={this.props.UI.display} />
      </div>
    );
  }
});

export default ReactApp;
