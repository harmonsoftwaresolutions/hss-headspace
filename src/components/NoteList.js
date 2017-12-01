import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNotes } from '../reducers/note';

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

class NoteList extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  render() {
    return (
      <ul>
        {this.props.notes.map(note => <NoteItem key={note.id} {...note} />)}
      </ul>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
};

NoteList.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
};

export default connect(state => ({ notes: state.notes }), { fetchNotes })(
  NoteList
);
