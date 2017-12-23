import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import note from './reducers/note';
import message from './reducers/message';
import editor from './reducers/editor';
import selected from './reducers/selection';

const reducer = combineReducers({ note, message, editor, selected });

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
