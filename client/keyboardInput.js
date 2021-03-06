var keyTable = {
  27: 'Escape',
  32: 'Space',
  9: 'Tab',
  192: '`',
  17: 'Control',
  18: 'Alt'
};

export default function(actionDispatcher){

  document.onkeyup = function(evt) {
    evt = evt || window.event;
    var key = '';
    //console.log(evt.key, evt.keyCode)
    if ( 'key' in evt ) {
      key = evt.key;
    } else {
      key = keyTable(evt.keyCode);
      if( !key ){
        key = evt.keyCode;
      }
    }

    if( key === 'Escape' ){
      actionDispatcher.toggleSearchFocus();
    } else if( key.slice(0,5) === 'Arrow' ){
      var direction = key.slice(5);
      actionDispatcher.moveFocus(direction);
    } else if( key === 'Enter' ){
      actionDispatcher.enterKey();
    } else if( key === 'Alt' ){
      actionDispatcher.toggleInputMode();
    }

  };


  //document.onkeypress = function(e) {
  //  e = e || window.event;
  //  // use e.keyCode
  //  //console.log(e, 'key', e.code);
  //  if( e.code == 'Enter'){
  //    var newNote = document.getElementById('noteInput').value;
  //    actionDispatcher.addNote(newNote);
  //  }
  //};


}
