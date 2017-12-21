import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import * as fromEditor from '../reducers/editor';

const EditorWindow = ({ editorState, readOnly, saveEditor }) => (
  <div id="editor">
    <Editor
      editorState={editorState}
      onChange={saveEditor}
      readOnly={readOnly}
    />
  </div>
);

EditorWindow.defaultProps = {
  editorState: PropTypes.shape({}),
  readOnly: PropTypes.bool,
  saveEditor: PropTypes.func,
};

EditorWindow.propTypes = {
  editorState: PropTypes.shape({}),
  readOnly: PropTypes.bool,
  saveEditor: PropTypes.func,
};

export default connect(
  state => ({
    editorState: state.editor.editorState,
    readOnly: state.editor.readOnly,
  }),
  {
    saveEditor: fromEditor.saveEditor,
  }
)(EditorWindow);
