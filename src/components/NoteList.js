import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNotes, saveNote, updateCurrent } from '../reducers/note';

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
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  handleInputChange(evt) {
    const val = evt.target.value;
    this.props.updateCurrent(val);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.saveNote(this.props.currentNote);
  }

  render() {
    const { currentNote } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={currentNote}
          />
        </form>
        <ul>
          {this.props.notes.map(note => <NoteItem key={note.id} {...note} />)}
        </ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
  currentNote: PropTypes.string,
  updateCurrent: PropTypes.func,
  saveNote: PropTypes.func,
};

NoteList.defaultProps = {
  notes: PropTypes.arrayOf(PropTypes.object),
  fetchNotes: PropTypes.func,
  currentNote: PropTypes.string,
  updateCurrent: PropTypes.func,
  saveNote: PropTypes.func,
};

export default connect(
  state => ({ notes: state.notes, currentNote: state.currentNote }),
  {
    updateCurrent,
    fetchNotes,
    saveNote,
  }
)(NoteList);
