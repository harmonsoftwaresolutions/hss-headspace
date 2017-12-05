import { EditorState } from 'draft-js';
import {
  getNotes,
  createNote,
  updateNote,
  destroyNote,
} from '../lib/noteServices';
import { showMessage } from './message';

const initState = {
  notes: [],
  currentNote: '',
  editorState: EditorState.createEmpty(),
};

// ACTION CONSTANTS
export const NOTE_ADD = 'NOTE_ADD';
export const NOTES_LOAD = 'NOTES_LOAD';
export const NOTE_REPLACE = 'NOTE_REPLACE';
export const NOTE_DELETE = 'NOTE_DELETE';
const EDITOR_UPDATE = 'EDITOR_UPDATE';
const CURRENT_UPDATE = 'CURRENT_UPDATE';

// ACTION CREATORS
export const updateEditor = val => ({ type: EDITOR_UPDATE, payload: val });
export const loadNotes = notes => ({ type: NOTES_LOAD, payload: notes });
export const addNote = note => ({ type: NOTE_ADD, payload: note });
export const updateCurrent = val => ({ type: CURRENT_UPDATE, payload: val });
export const replaceNote = note => ({ type: NOTE_REPLACE, payload: note });
export const removeNote = note => ({ type: NOTE_DELETE, payload: note });

export const fetchNotes = () => async dispatch => {
  dispatch(showMessage('Loading Notes'));
  const res = await getNotes();
  dispatch(loadNotes(res));
};
export const saveNote = title => async dispatch => {
  dispatch(showMessage('Saving Note'));
  const res = await createNote(title);
  dispatch(addNote(res));
};

export const toggleNote = id => async (dispatch, getState) => {
  dispatch(showMessage('Saving note update'));
  const { notes } = getState().note;
  const note = notes.find(n => n.id === id);
  const toggled = { ...note };
  const res = await updateNote(toggled);
  return dispatch(replaceNote(res));
};

export const deleteNote = id => async dispatch => {
  dispatch(showMessage('Deleting note'));
  await destroyNote(id);
  return dispatch(removeNote(id));
};

// REDUCER
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
    case NOTE_REPLACE:
      return {
        ...state,
        notes: state.notes.map(n => (n.id === payload.id ? payload : n)),
      };
    case NOTE_DELETE:
      return { ...state, notes: state.notes.filter(n => n.id !== payload) };
    default:
      return state;
  }
};
