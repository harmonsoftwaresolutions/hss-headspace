import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const baseUrl = process.env.REACT_APP_BASE_URL;

const putNote = async (id, content) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
};

export const UPDATE_EDITOR = 'UPDATE_EDITOR';
export const updateEditor = editorState => ({
  type: UPDATE_EDITOR,
  editorState,
});

export const SAVE_EDITOR = 'SAVE_EDITOR';
export const saveEditor = editorState => (dispatch, getState) => {
  const state = getState();
  const id = state.selected;
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  putNote(id, raw);
  dispatch(updateEditor(editorState));
};

export const loadEditor = id => (dispatch, getState) => {
  const state = getState();
  const notes = state.note.items;
  const item = notes.find(i => i.id === id);
  const content = convertFromRaw(item.content);
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
