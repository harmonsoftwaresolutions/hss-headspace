import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Notes from './components/NoteList';

const App = props => (
  <div className="container">
    <aside>
      <h3>Note List</h3>
      <Notes notes={props.notes} />
    </aside>
    <section>
      <div id="editor" contentEditable="true" />
    </section>
  </div>
);

App.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

App.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default App;
