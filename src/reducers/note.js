import { EditorState } from 'draft-js';

const initState = {
  notes: [
    { id: 0, title: 'note 0', text: 'this is text for note 0' },
    { id: 1, title: 'note 1', text: 'this is text for note 1' },
    { id: 2, title: 'note 2', text: 'this is text for note 2' },
  ],
  currentNote: { id: 2, title: 'note 2', text: 'this is text for note 2' },
  editorState: EditorState.createEmpty(),
};

const NOTE_ADD = 'NOTE_ADD';
const EDITOR_UPDATE = 'EDITOR_UPDATE';

export const updateEditor = val => ({ type: EDITOR_UPDATE, payload: val });

export default (state = initState, { type, payload }) => {
  switch (type) {
    case NOTE_ADD:
      return { ...state, notes: [...state.notes, payload] };
    case EDITOR_UPDATE:
      return { ...state, editorState: payload };
    default:
      return state;
  }
};
