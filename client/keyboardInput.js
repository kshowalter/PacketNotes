export default function(actionDispatcher){

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ( 'key' in evt ) {
      isEscape = evt.key == 'Escape';
    } else {
      isEscape = evt.keyCode == 27;
    }
    if (isEscape) {
      document.getElementById('searchInput').focus();
    }
  };


  document.onkeypress = function(e) {
    e = e || window.event;
    // use e.keyCode
    //console.log(e, 'key', e.code);
    if( e.code == 'Enter'){
      var newNote = document.getElementById('noteInput').value;
      actionDispatcher.addNote(newNote);

      document.getElementById('noteInput').value = '';
      document.getElementById('noteInput').focus();
    }
  };


}
