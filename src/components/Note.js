import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ id, title, toggleNote, deleteNote }) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteNote(id)}>X</button>
    </span>
    <button onClick={() => toggleNote(id)}>{title}</button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  toggleNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  toggleNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default NoteItem;
