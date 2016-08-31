export default {

  addNote: function(text,parentID){
    return {
      type: 'addNote',
      text: text,
      parentID: parentID
    };
  },
  selectTag: function(tag){
    return {
      type: 'selectTag',
      tag: tag
    };
  },
  updateSearchString: function(searchString){
    return {
      type: 'updateSearchString',
      searchString: searchString
    };
  },
  updateTime: function(searchString){
    return {
      type: 'updateTime',
      searchString: searchString
    };
  },
  toggleSearchFocus: function(){
    return {
      type: 'toggleSearchFocus',
      toggle: true
    };
  },
  moveFocus: function(direction){
    return {
      type: 'moveFocus',
      direction: direction
    };
  },
  enterKey: function(){
    return {
      type: 'enterKey'
    };
  },
  toggleInputMode: function(){
    return {
      type: 'toggleInputMode'
    };
  }

};
