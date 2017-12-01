import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/note';

export default createStore(reducer, applyMiddleware(thunk));
