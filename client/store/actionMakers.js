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
  setFocus: function(elementId){
    return {
      type: 'element_id',
      elementId: elementId
    };
  },
  keyPress: function(key){
    return {
      type: 'key_press',
      key: key
    };
  }

};
