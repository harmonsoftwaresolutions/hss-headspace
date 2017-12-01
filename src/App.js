import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './App.css';
import { updateEditor } from './reducers/note';
import NoteList from './components/NoteList';

const App = props => {
  const { editorState } = props;
  return (
    <div className="container">
      <aside>
        <h3>Note List</h3>
        <NoteList />
      </aside>
      <section>
        <div id="editor">
          <Editor editorState={editorState} onChange={props.updateEditor} />
        </div>
      </section>
    </div>
  );
};

App.defaultProps = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

App.propTypes = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

export default connect(state => state, { updateEditor })(App);
