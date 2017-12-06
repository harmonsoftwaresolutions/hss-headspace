import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import { updateEditor } from '../reducers/note';

const EditorWindow = props => (
  <div id="editor">
    <Editor
      editorState={props.editorState}
      onChange={props.updateEditor}
      readOnly={props.currentNote.id < 0}
    />
  </div>
);

EditorWindow.defaultProps = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
  currentNote: PropTypes.shape({ id: PropTypes.number }),
};

EditorWindow.propTypes = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
  currentNote: PropTypes.shape({ id: PropTypes.number }),
};

export default connect(
  state => ({
    editorState: state.note.editorState,
    currentNote: state.note.currentNote,
  }),
  {
    updateEditor,
  }
)(EditorWindow);
