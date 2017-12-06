import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ id, title, selectNote, deleteNote }) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteNote(id)}>X</button>
    </span>
    <button onClick={() => selectNote(id)}>{title}</button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default NoteItem;
