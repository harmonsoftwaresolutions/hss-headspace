import React from 'react';
import './App.css';

const App = () => (
  <div className="container">
    <aside>Note List</aside>
    <section>
      <div id="editor" contentEditable="true" />
    </section>
  </div>
);

export default App;
