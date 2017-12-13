import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import note from './reducers/note';
import message from './reducers/message';
import editor from './reducers/editor';

const reducer = combineReducers({ note, message, editor });

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
