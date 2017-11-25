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
      <div id="editor">
        <textarea type="text" defaultValue={props.currentNote.text} />
      </div>
    </section>
  </div>
);

App.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  currentNote: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

App.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  currentNote: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default App;
