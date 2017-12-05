import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchNotes,
  saveNote,
  updateInputNote,
  toggleNote,
  deleteNote,
} from '../reducers/note';
import NoteItem from './Note';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  handleInputChange(evt) {
    const text = evt.target.value;
    this.props.updateInputNote(text);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.saveNote(this.props.inputNote);
  }

  render() {
    const { inputNote } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={inputNote}
          />
        </form>
        <ul>
          {this.props.notes.map(note => (
            <NoteItem
              key={note.id}
              toggleNote={this.props.toggleNote}
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
  inputNote: PropTypes.string,
  updateInputNote: PropTypes.func,
  saveNote: PropTypes.func,
  toggleNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteList.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
  inputNote: PropTypes.string,
  updateInputNote: PropTypes.func,
  saveNote: PropTypes.func,
  toggleNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default connect(
  state => ({ notes: state.note.notes, inputNote: state.note.inputNote }),
  {
    updateInputNote,
    fetchNotes,
    saveNote,
    toggleNote,
    deleteNote,
  }
)(NoteList);
