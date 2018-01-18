// const baseUrl = process.env.REACT_APP_BASE_URL;

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
  const res = await fetch('/notes');
  return res.json();
};

export const getAllNotes = () => async dispatch => {
  dispatch(requestNotes());
  const notes = await fetchGetAllNotes();
  dispatch(receiveNotes(notes));
};

// GET NOTE
//
const fetchGetNote = async id => {
  const res = await fetch(`/notes/${id}`);
  return res.json();
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

const fetchPostNote = async data => {
  const res = await fetch('/notes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createNote = content => async dispatch => {
  const note = await fetchPostNote({ content });
  dispatch(addNote(note));
};

// UPDATE NOTE
//
const fetchPutNote = async (id, data) => {
  const res = await fetch(`/notes/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
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
