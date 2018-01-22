import gql from 'graphql-tag';
import client from '../apollo-client';

export const INVALIDATE_NOTE = 'INVALIDATE_NOTE';
export const invalidateNote = id => ({ type: INVALIDATE_NOTE, id });

// GET ALL
//
export const REQUEST_NOTES = 'REQUEST_NOTES';
export const requestNotes = (id = -1) => ({ type: REQUEST_NOTES, id });

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes,
  receivedAt: Date.now(),
});

const fetchGetAllNotes = async () => {
  const res = await client.query({
    query: gql`
      {
        notes {
          id
          content
        }
      }
    `,
  });
  const { data } = res;
  const { notes } = data;

  return notes;
};

export const getAllNotes = () => async dispatch => {
  dispatch(requestNotes());
  const notes = await fetchGetAllNotes();
  dispatch(receiveNotes(notes));
};

// GET NOTE
//
const fetchGetNote = async id => {
  const res = await client.query({
    query: gql`
      {
        note(id: ${id}) {
          id
          content
        }
      }
    `,
  });
  const { data } = res;
  const { note } = data;

  return note;
};

// GET NOTE FROM SERVER, UPDATE ITEMS STATE, DISPATCH
export const getNote = id => async (dispatch, getState) => {
  const note = await fetchGetNote(id);
  const { content } = note;
  // return new set of items, update specific item content
  const state = getState();
  // update single item
  const items = state.note.items.map(item => {
    if (item.id === id) {
      return note;
    }

    return { ...item };
  });

  dispatch(receiveNotes(items));
  // can't call dispatch(loadEditor(content)) - dispatch won't be available
  return content;
};

// CREATE NOTE
//
const ADD_NOTE = 'ADD_NOTE';
const addNote = note => ({ type: ADD_NOTE, note });

const fetchPostNote = async content => {
  const res = await client.mutate({
    variables: { content },
    mutation: gql`
      mutation AddNote($content: JSON!) {
        addNote(content: $content) {
          id
          content
        }
      }
    `,
  });
  const { data } = res;
  const { addNote: note } = data;

  return note;
};

export const createNote = content => async dispatch => {
  const note = await fetchPostNote({ content });
  dispatch(addNote(note));
};

// UPDATE NOTE
//
const fetchPutNote = async (id, content) => {
  const res = await client.mutate({
    variables: { id, content },
    mutation: gql`
      mutation UpdateNote($id: ID!, $content: JSON!) {
        updateNote(id: $id, content: $content) {
          id
          content
        }
      }
    `,
  });
  const { data } = res;
  const { updateNote: note } = data;

  return note;
};

export const putNote = async (id, content) => {
  await fetchPutNote(id, { content });
};

// REDUCER
//
export default (
  state = { isFetching: false, didInvalidate: false, items: [{ id: -1 }] },
  action
) => {
  switch (action.type) {
    case INVALIDATE_NOTE:
      return { ...state, didInvalidate: true };
    case REQUEST_NOTES:
      return { ...state, isFetching: true, didInvalidate: false };
    case RECEIVE_NOTES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.notes,
        lastUpdated: action.receivedAt,
      };
    case ADD_NOTE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, action.note],
      };
    default:
      return state;
  }
};
