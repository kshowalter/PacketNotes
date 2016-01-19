export const ADD_ITEM = 'ADD_ITEM';


export function tick(text,parentID){
  return {
    type: ADD_ITEM,
    text: text,
    parentID: parentID
  };
}
