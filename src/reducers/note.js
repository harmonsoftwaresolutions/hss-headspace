import { EditorState } from 'draft-js';
import { getNotes, createNote } from '../lib/noteServices';

const initState = {
  notes: [],
  currentNote: '',
  editorState: EditorState.createEmpty(),
};

const EDITOR_UPDATE = 'EDITOR_UPDATE';
const NOTES_LOAD = 'NOTES_LOAD';
const NOTE_ADD = 'NOTE_ADD';
const CURRENT_UPDATE = 'CURRENT_UPDATE';

export const updateEditor = val => ({ type: EDITOR_UPDATE, payload: val });
export const loadNotes = notes => ({ type: NOTES_LOAD, payload: notes });
export const addNote = note => ({ type: NOTE_ADD, payload: note });
export const updateCurrent = val => ({ type: CURRENT_UPDATE, payload: val });

export const fetchNotes = () => async dispatch => {
  const res = await getNotes();
  dispatch(loadNotes(res));
};
export const saveNote = title => async dispatch => {
  const res = await createNote(title);
  dispatch(addNote(res));
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case NOTES_LOAD:
      return { ...state, notes: payload };
    case NOTE_ADD:
      return { ...state, currentNote: '', notes: [...state.notes, payload] };
    case CURRENT_UPDATE:
      return { ...state, currentNote: payload };
    case EDITOR_UPDATE:
      return { ...state, editorState: payload };
    default:
      return state;
  }
};
