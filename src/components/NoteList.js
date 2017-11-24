import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ text }) => <li>{text}</li>;

NoteItem.propTypes = {
  text: PropTypes.string,
};

NoteItem.defaultProps = {
  text: PropTypes.string,
};

const Notes = props => (
  <ul>{props.notes.map(note => <NoteItem key={note.id} {...note} />)}</ul>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
};

Notes.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
};

export default Notes;
