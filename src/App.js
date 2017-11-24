import React, { Component } from 'react';
import './App.css';
import Notes from './components/NoteList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <aside>
          <h3>Note List</h3>
          <Notes notes={this.props.notes} />
        </aside>
        <section>
          <div id="editor" contentEditable="true" />
        </section>
      </div>
    );
  }
}

export default App;
