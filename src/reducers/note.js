import { EditorState, convertToRaw } from 'draft-js';
import {
  getNotes,
  createNote,
  updateNote,
  destroyNote,
} from '../lib/noteServices';
import { onLoadEditorState } from './editor';
import { showMessage } from './message';

const defaultState = {
  notes: [],
  currentNote: { id: -1 },
};

// ACTION CONSTANTS
export const NOTES_LOAD = 'NOTES_LOAD';
export const NOTE_ADD = 'NOTE_ADD';
export const NOTE_REPLACE = 'NOTE_REPLACE';
export const NOTE_DELETE = 'NOTE_DELETE';
export const CURRENT_UPDATE = 'CURRENT_UPDATE';

// ACTION CREATORS
export const loadNotes = notes => ({ type: NOTES_LOAD, payload: notes });
export const addNote = note => ({ type: NOTE_ADD, payload: note });
export const replaceNote = note => ({ type: NOTE_REPLACE, payload: note });
export const removeNote = note => ({ type: NOTE_DELETE, payload: note });
export const updateCurrent = note => ({ type: CURRENT_UPDATE, payload: note });

export const fetchNotes = () => async dispatch => {
  dispatch(showMessage('Loading Notes'));
  const res = await getNotes();
  dispatch(loadNotes(res));
};

export const newNote = () => async dispatch => {
  const editorState = EditorState.createEmpty();
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  const note = await createNote(raw);

  return dispatch(addNote(note));
};

export const saveNote = (id, editorState) => async dispatch => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  const note = await updateNote(id, raw);

  return dispatch(replaceNote(note));
};

export const selectNote = id => async (dispatch, getState) => {
  const state = getState() || [];
  const notes =
    state.note && state.note.notes && state.note.notes.length > 0
      ? state.note.notes
      : [];
  notes.filter(n => n.id === id).map(n => {
    dispatch(onLoadEditorState(n.content));
    return dispatch(updateCurrent(n));
  });
};

export const deleteNote = id => async dispatch => {
  dispatch(showMessage('Deleting note'));
  await destroyNote(id);
  return dispatch(removeNote(id));
};

// REDUCER
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case NOTES_LOAD:
      return { ...state, notes: payload };
    case NOTE_ADD:
      return { ...state, notes: [...state.notes, payload] };
    case NOTE_REPLACE:
      return {
        ...state,
        notes: state.notes.map(n => (n.id === payload.id ? payload : n)),
      };
    case NOTE_DELETE:
      return { ...state, notes: state.notes.filter(n => n.id !== payload) };
    case CURRENT_UPDATE:
      return { ...state, currentNote: payload };
    default:
      return state;
  }
};
