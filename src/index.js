import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const state = {
  notes: [
    { id: 0, title: 'note 0', text: 'this is text for note 0' },
    { id: 1, title: 'note 1', text: 'this is text for note 1' },
    { id: 2, title: 'note 2', text: 'this is text for note 2' },
  ],
};

ReactDOM.render(<App notes={state.notes} />, document.getElementById('root'));
registerServiceWorker();
