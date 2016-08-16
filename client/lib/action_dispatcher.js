var Acter = function(name, actionDispatcher){
  return function(){
    actionDispatcher._dispatch( actionDispatcher._actions[name].apply(actionDispatcher, arguments) );
  };
};

export default function(store, actionMakers){

  var actionDispatcher = {
    _store: store,
    _dispatch: function(action){
      this._store.dispatch(action);
    },
    _actions: []
  };

  for( var actionName in actionMakers ){
    actionDispatcher._actions[actionName] = actionMakers[actionName];
    actionDispatcher[actionName] = Acter(actionName, actionDispatcher);
  }

  return actionDispatcher;
}
