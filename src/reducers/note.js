const baseUrl = process.env.REACT_APP_BASE_URL;

// fetching notes
export const REQUEST_NOTES = 'REQUEST_NOTES';
export const requestNotes = (id = -1) => ({ type: REQUEST_NOTES, id });
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes,
  receivedAt: Date.now(),
});
const fetchNotes = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};
export const getNotes = () => async dispatch => {
  dispatch(requestNotes());
  dispatch(receiveNotes(await fetchNotes()));
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
