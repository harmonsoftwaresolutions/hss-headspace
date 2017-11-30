import { EditorState } from 'draft-js';
import getNotes from '../lib/noteServices';

const initState = {
  notes: [],
  currentNote: { id: 2, title: 'note 2', text: 'this is text for note 2' },
  editorState: EditorState.createEmpty(),
};

const NOTE_ADD = 'NOTE_ADD';
const EDITOR_UPDATE = 'EDITOR_UPDATE';
const NOTES_LOAD = 'NOTES_LOAD';

export const updateEditor = val => ({ type: EDITOR_UPDATE, payload: val });
export const loadNotes = notes => ({ type: NOTES_LOAD, payload: notes });
export const fetchNotes = () => async dispatch => {
  const notes = await getNotes();
  dispatch(loadNotes(notes));
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case NOTE_ADD:
      return { ...state, notes: [...state.notes, payload] };
    case NOTES_LOAD:
      return { ...state, notes: payload };
    case EDITOR_UPDATE:
      return { ...state, editorState: payload };
    default:
      return state;
  }
};
