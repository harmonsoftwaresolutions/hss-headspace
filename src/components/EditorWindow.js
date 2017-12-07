import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';
import { saveNote } from '../reducers/note';

const EditorWindow = ({ id, editorState }) => {
  const readOnly = Object.keys(editorState).length === 0;
  const state =
    Object.keys(editorState).length === 0
      ? EditorState.createEmpty()
      : editorState;
  return (
    <div id="editor">
      <Editor
        editorState={state}
        onChange={eState => saveNote(id, eState)}
        readOnly={readOnly}
      />
    </div>
  );
};

EditorWindow.defaultProps = {
  id: PropTypes.number,
  editorState: PropTypes.shape({}),
  saveEditor: PropTypes.func,
};

EditorWindow.propTypes = {
  id: PropTypes.number,
  editorState: PropTypes.shape({}),
  saveEditor: PropTypes.func,
};

export default connect(
  state => ({
    id: state.note.currentNote.id,
    editorState: state.note.currentNote.editorState,
  }),
  {
    saveNote,
  }
)(EditorWindow);
