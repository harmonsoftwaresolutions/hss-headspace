import React from 'react';
import 'draft-js/dist/Draft.css';
import './App.css';
import NoteList from './components/NoteList';
import Message from './components/Message';
import EditorWindow from './components/EditorWindow';

const App = () => (
  <div className="container">
    <Message />
    <aside>
      <h3>Note List</h3>
      <NoteList />
    </aside>
    <section>
      <EditorWindow />
    </section>
  </div>
);

export default App;
