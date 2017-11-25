import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const render = () => {
  const state = store.getState();
  const app = <App notes={state.notes} currentNote={state.currentNote} />;
  ReactDOM.render(app, document.getElementById('root'));
};
render();

store.subscribe(render);
registerServiceWorker();
