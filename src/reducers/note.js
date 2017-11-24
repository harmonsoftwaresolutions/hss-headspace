const initState = {
  notes: [
    { id: 0, title: 'note 0', text: 'this is text for note 0' },
    { id: 1, title: 'note 1', text: 'this is text for note 1' },
    { id: 2, title: 'note 2', text: 'this is text for note 2' },
  ],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'NOTE_ADD':
      return { ...state, notes: [...state.notes, action.payload] };
    default:
      return state;
  }
};
