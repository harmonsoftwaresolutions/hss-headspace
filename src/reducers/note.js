import { loadEditor } from './editor';

const baseUrl = process.env.REACT_APP_BASE_URL;

// API CALLS
const fetchAllNotes = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};
const fetchGetNote = async id => {
  const res = await fetch(`${baseUrl}/${id}`);
  return res.json();
};

const fetchPutNote = async (id, data) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const REQUEST_NOTES = 'REQUEST_NOTES';
export const requestNotes = (id = -1) => ({ type: REQUEST_NOTES, id });
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes,
  receivedAt: Date.now(),
});
export const getNote = id => async (dispatch, getState) => {
  const note = await fetchGetNote(id);
  const { content } = note;
  // return new set of items, update specific item content
  const state = getState();
  const items = state.note.items.map(item => {
    if (item.id === id) {
      return note;
    }

    return { ...item };
  });

  dispatch(receiveNotes(items));
  return content;
};

export const putNote = async (id, content) => {
  await fetchPutNote(id, { content });
};

export const getAllNotes = () => async dispatch => {
  dispatch(requestNotes());
  const notes = await fetchAllNotes();
  dispatch(receiveNotes(notes));
};

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const updateNote = rawText => ({ type: UPDATE_NOTE, rawText });

export const INVALIDATE_NOTE = 'INVALIDATE_NOTE';
export const invalidateNote = id => ({ type: INVALIDATE_NOTE, id });

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
    default:
      return state;
  }
};
