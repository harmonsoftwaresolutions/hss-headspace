import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ text }) => <li>{text}</li>;

NoteItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  text: PropTypes.string,
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
