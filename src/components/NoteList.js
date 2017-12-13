import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNotes, newNote, selectNote, deleteNote } from '../reducers/note';
import NoteItem from './Note';

class NoteList extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.newNote()}>+</button>
        <ul>
          {this.props.notes.map(note => (
            <NoteItem
              key={note.id}
              selectNote={this.props.selectNote}
              deleteNote={this.props.deleteNote}
              {...note}
            />
          ))}
        </ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
  newNote: PropTypes.func,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteList.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
  newNote: PropTypes.func,
  selectNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default connect(
  state => ({
    notes: state.note.notes,
    currentNote: state.note.currentNote,
  }),
  {
    fetchNotes,
    newNote,
    selectNote,
    deleteNote,
  }
)(NoteList);
