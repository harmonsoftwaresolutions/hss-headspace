import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ id, deleteNote, selectNote }) => (
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

export default NoteItem;
