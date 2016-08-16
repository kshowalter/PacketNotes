export function addNote(text,parentID){
  return {
    type: 'add_note',
    text: text,
    parentID: parentID
  };
}
export function selectTag(tag){
  return {
    type: 'select_tag',
    tag: tag
  };
}
export function updateSearchString(searchString){
  return {
    type: 'update_search_string',
    searchString: searchString
  };
}
