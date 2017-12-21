import { loadEditor } from './editor';

export const SELECT_NOTE = 'SELECT_NOTE';
export const selectNote = id => ({ type: SELECT_NOTE, id });
export const select = id => dispatch => {
  dispatch(selectNote(id));
  dispatch(loadEditor(id));
};

export default function selectedNote(state = -1, action) {
  switch (action.type) {
    case SELECT_NOTE:
      return action.id;
    default:
      return state;
  }
}
