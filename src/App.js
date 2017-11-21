import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <aside>Note List</aside>
        <section>
          <div id="editor" contenteditable="true"></div>
        </section>
      </div>
    );
  }
}

export default App;
