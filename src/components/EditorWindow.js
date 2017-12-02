import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import { updateEditor } from '../reducers/note';

const EditorWindow = props => (
  <div id="editor">
    <Editor editorState={props.editorState} onChange={props.updateEditor} />
  </div>
);

EditorWindow.defaultProps = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

EditorWindow.propTypes = {
  editorState: PropTypes.shape({}),
  updateEditor: PropTypes.func,
};

export default connect(state => ({ editorState: state.editorState }), {
  updateEditor,
})(EditorWindow);
