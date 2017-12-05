import { NOTE_ADD, NOTES_LOAD, NOTE_REPLACE, NOTE_DELETE } from './note';

const MESSAGE_SHOW = 'MESSAGE_SHOW';

export const showMessage = msg => ({ type: MESSAGE_SHOW, payload: msg });

export default (state = '', { type, payload }) => {
  switch (type) {
    case MESSAGE_SHOW:
      return payload;
    case NOTE_ADD:
      return '';
    case NOTES_LOAD:
      return '';
    case NOTE_REPLACE:
      return '';
    case NOTE_DELETE:
      return '';
    default:
      return state;
  }
};
