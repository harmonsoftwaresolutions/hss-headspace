import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { updateEditor } from './reducers/note';

const actions = bindActionCreators(
  {
    updateEditor,
  },
  store.dispatch
);

const render = () => {
  const state = store.getState();
  const app = (
    <App
      notes={state.notes}
      currentNote={state.currentNote}
      updateEditor={actions.updateEditor}
      editorState={state.editorState}
    />
  );
  ReactDOM.render(app, document.getElementById('root'));
};
render();

store.subscribe(render);
registerServiceWorker();
