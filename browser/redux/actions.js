export const TEST = 'TEST';
export const ADD_ITEM = 'ADD_ITEM';
export const SELECT_TAG = 'SELECT_TAG';
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';


export function addItem(text,parentID){
  return {
    type: ADD_ITEM,
    text: text,
    parentID: parentID
  };
}

export function test(input){
  return {
    type: TEST,
    input: input
  };
}

export function selectTag(tag){
  return {
    type: SELECT_TAG,
    tag: tag
  };
}
export function updateSearchString(searchString){
  return {
    type: UPDATE_SEARCH_STRING,
    searchString: searchString
  };
}
