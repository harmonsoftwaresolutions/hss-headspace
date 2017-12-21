import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import * as fromEditor from '../reducers/editor';

const EditorWindow = ({ editorState, saveEditor }) => (
  <div id="editor">
    <Editor editorState={editorState} onChange={saveEditor} />
  </div>
);

EditorWindow.defaultProps = {
  editorState: PropTypes.shape({}),
  saveEditor: PropTypes.func,
};

EditorWindow.propTypes = {
  editorState: PropTypes.shape({}),
  saveEditor: PropTypes.func,
};

export default connect(
  state => ({
    editorState: state.editor.editorState,
  }),
  {
    saveEditor: fromEditor.saveEditor,
  }
)(EditorWindow);
