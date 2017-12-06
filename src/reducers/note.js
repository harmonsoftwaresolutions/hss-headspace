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
  inputNote: '',
  currentNote: { id: -1 },
  editorState: EditorState.createEmpty(),
};

// ACTION CONSTANTS
export const NOTE_ADD = 'NOTE_ADD';
export const NOTES_LOAD = 'NOTES_LOAD';
export const NOTE_REPLACE = 'NOTE_REPLACE';
export const NOTE_DELETE = 'NOTE_DELETE';
const EDITOR_UPDATE = 'EDITOR_UPDATE';
const INPUT_NOTE_UPDATE = 'INPUT_NOTE_UPDATE';
const CURRENT_UPDATE = 'CURRENT_UPDATE';

// ACTION CREATORS
export const loadNotes = notes => ({ type: NOTES_LOAD, payload: notes });
export const addNote = note => ({ type: NOTE_ADD, payload: note });
export const replaceNote = note => ({ type: NOTE_REPLACE, payload: note });
export const removeNote = note => ({ type: NOTE_DELETE, payload: note });
export const updateEditor = val => ({ type: EDITOR_UPDATE, payload: val });
export const updateInputNote = title => ({
  type: INPUT_NOTE_UPDATE,
  payload: title,
});
export const updateCurrent = note => ({ type: CURRENT_UPDATE, payload: note });

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

export const selectNote = id => async (dispatch, getState) => {
  const { notes } = getState().note;
  const note = notes.find(n => n.id === id);
  return dispatch(updateCurrent(note));
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
      return { ...state, inputNote: '', notes: [...state.notes, payload] };
    case NOTE_REPLACE:
      return {
        ...state,
        notes: state.notes.map(n => (n.id === payload.id ? payload : n)),
      };
    case NOTE_DELETE:
      return { ...state, notes: state.notes.filter(n => n.id !== payload) };
    case EDITOR_UPDATE:
      return { ...state, editorState: payload };
    case INPUT_NOTE_UPDATE:
      return { ...state, inputNote: payload };
    case CURRENT_UPDATE:
      return { ...state, notes: state.notes, currentNote: payload };
    default:
      return state;
  }
};
