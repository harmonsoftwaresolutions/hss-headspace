import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './App.css';
import Notes from './components/NoteList';

const App = props => {
  const { updateEditor, notes, editorState } = props;
  return (
    <div className="container">
      <aside>
        <h3>Note List</h3>
        <Notes notes={notes} />
      </aside>
      <section>
        <div id="editor">
          <Editor editorState={editorState} onChange={updateEditor} />
        </div>
      </section>
    </div>
  );
};

App.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.shape({})),
  currentNote: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

App.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({})),
  currentNote: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

export default App;
