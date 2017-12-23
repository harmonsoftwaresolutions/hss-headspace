import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { putNote } from './note';

export const UPDATE_EDITOR = 'UPDATE_EDITOR';
export const updateEditor = editorState => ({
  type: UPDATE_EDITOR,
  editorState,
});

export const SAVE_EDITOR = 'SAVE_EDITOR';
export const saveEditor = editorState => async (dispatch, getState) => {
  const state = getState();
  const id = state.selected;
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  await putNote(id, raw);
  dispatch(updateEditor(editorState));
};

export const loadEditor = raw => dispatch => {
  const content = convertFromRaw(raw);
  const editorState = EditorState.createWithContent(content);
  dispatch(updateEditor(editorState));
};

export default (
  state = { editorState: EditorState.createEmpty(), readOnly: true },
  action
) => {
  switch (action.type) {
    case UPDATE_EDITOR:
      return { ...state, editorState: action.editorState, readOnly: false };
    default:
      return state;
  }
};
