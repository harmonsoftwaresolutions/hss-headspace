import { EditorState, convertFromRaw } from 'draft-js';

const defaultState = {
  editorState: EditorState.createEmpty(),
};

// ACTION CONSTANTS
const EDITOR_UPDATE = 'EDITOR_UPDATE';

// ACTION CREATORS
const updateEditor = editorState => ({
  type: EDITOR_UPDATE,
  payload: editorState,
});

export const onLoadEditorState = raw => dispatch => {
  const contentState = convertFromRaw(raw);
  const editorState = EditorState.createWithContent(contentState);
  dispatch(updateEditor(editorState));
};

export const onSaveEditorState = editorState => dispatch => {
  dispatch(updateEditor(editorState));
};

// REDUCER
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case EDITOR_UPDATE:
      return { ...state, editorState: payload, readOnly: false };
    default:
      return state;
  }
};
