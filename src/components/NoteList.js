import React from 'react';

const NoteItem = ({ id, text }) => <li>{text}</li>;

export default props => (
  <ul>{props.notes.map(note => <NoteItem key={note.id} {...note} />)}</ul>
);
