import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ title }) => (
  <li>
    <button>{title}</button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  title: PropTypes.string,
};

const Notes = props => (
  <ul>{props.notes.map(note => <NoteItem key={note.id} {...note} />)}</ul>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

Notes.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default Notes;
