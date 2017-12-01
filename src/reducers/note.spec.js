import reducer from './note';

describe('Note reducer', () => {
  test('returns a state object', () => {
    const result = reducer(undefined, { type: 'ANYTHING' });
    expect(result).toBeDefined();
  });

  test('adds a note', () => {
    const startState = {
      notes: [
        { id: 0, title: 'note 0', text: 'this is text for note 0' },
        { id: 1, title: 'note 1', text: 'this is text for note 1' },
        { id: 2, title: 'note 2', text: 'this is text for note 2' },
      ],
    };
    const expectedState = {
      notes: [
        { id: 0, title: 'note 0', text: 'this is text for note 0' },
        { id: 1, title: 'note 1', text: 'this is text for note 1' },
        { id: 2, title: 'note 2', text: 'this is text for note 2' },
        { id: 3, title: 'note 3', text: 'this is text for note 3' },
      ],
      currentNote: '',
    };
    const payload = { id: 3, title: 'note 3', text: 'this is text for note 3' };
    const action = { type: 'NOTE_ADD', payload };
    const result = reducer(startState, action);
    expect(result).toEqual(expectedState);
  });
});
