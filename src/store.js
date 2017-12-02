import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import noteReducer from './reducers/note';
import messageReducer from './reducers/message';

const reducer = combineReducers({ note: noteReducer, message: messageReducer });

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
