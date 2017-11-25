import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const noteChangeHandler = val =>
  store.dispatch({ type: 'CURRENT_UPDATE', payload: val });

const render = () => {
  const state = store.getState();
  const app = (
    <App
      notes={state.notes}
      currentNote={state.currentNote}
      changeCurrent={noteChangeHandler}
      editorState={state.editorState}
    />
  );
  ReactDOM.render(app, document.getElementById('root'));
};
render();

store.subscribe(render);
registerServiceWorker();
