export default {

  addNote: function(text,parentID){
    return {
      type: 'add_note',
      text: text,
      parentID: parentID
    };
  },
  selectTag: function(tag){
    return {
      type: 'select_tag',
      tag: tag
    };
  },
  updateSearchString: function(searchString){
    return {
      type: 'update_search_string',
      searchString: searchString
    };
  },
  updateTime: function(searchString){
    return {
      type: 'update_time',
      searchString: searchString
    };
  },
  toggleSearchFocus: function(){
    return {
      type: 'toggle_search_focus',
      toggle: true
    };
  },
  moveFocus: function(direction){
    return {
      type: 'move_focus',
      direction: direction
    };
  },
  enterKey: function(){
    return {
      type: 'enter_key'
    };
  },
  toggleInputMode: function(){
    return {
      type: 'toggleInputMode'
    };
  }

};
