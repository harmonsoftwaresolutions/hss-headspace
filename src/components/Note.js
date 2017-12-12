import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromNote from '../reducers/note';

const NoteItem = ({ id, selectNote, deleteNote }) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteNote(id)}>X</button>
    </span>
    <button onClick={() => selectNote(id)}>{id}</button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

// export default NoteItem;
export default connect(
  state => ({
    notes: state.note.notes,
    currentNote: state.note.currentNote,
  }),
  {
    selectNote: fromNote.selectNote,
    deleteNote: fromNote.deleteNote,
  }
)(NoteItem);
