import { combineReducers } from 'redux';

import {
  ADD_ITEM
} from './actions';


var addItem = function(state,action){
  return state;
};

function reducer( state={}, action ){
  //console.log('Action: ', action);
  //var state = Object.assign({}, state);

  if( ! action ){
    return state;
  }

  if( action.type === ADD_ITEM ){
    return addItem(state, action);
  } else {
    return state;
  }

}

export default reducer;
