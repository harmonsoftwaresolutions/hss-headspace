import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import * as fromNote from '../reducers/editor';

const EditorWindow = ({ editorState, onSaveEditorState }) => (
  <div id="editor">
    <Editor editorState={editorState} onChange={onSaveEditorState} />
  </div>
);

EditorWindow.defaultProps = {
  editorState: PropTypes.shape({}),
  onSaveEditorState: PropTypes.func,
};

EditorWindow.propTypes = {
  editorState: PropTypes.shape({}),
  onSaveEditorState: PropTypes.func,
};

export default connect(
  state => ({
    editorState: state.editor.editorState,
  }),
  {
    onSaveEditorState: fromNote.onSaveEditorState,
  }
)(EditorWindow);
