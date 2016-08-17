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
  }

};
