import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import * as fromNote from '../reducers/note';
import NoteItem from './Note';

class NoteList extends Component {
  async componentDidMount() {
    await this.props.getAllNotes();
  }

  render() {
    const { note } = this.props;
    return (
      <div>
        <button onClick={async () => {
          const editorState = EditorState.createEmpty();
          const contentState = editorState.getCurrentContent();
          const raw = convertToRaw(contentState);
          await this.props.createNote(raw);
          }}>+</button>
        <ul>{note.items.map(item => <NoteItem key={item.id} {...item} />)}</ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  note: PropTypes.shape(),
  getAllNotes: PropTypes.func,
  createNote: PropTypes.func,
};

NoteList.defaultProps = {
  note: PropTypes.shape(),
  getAllNotes: PropTypes.func,
  createNote: PropTypes.func,
};

export default connect(
  state => ({
    note: state.note,
  }),
  {
    getAllNotes: fromNote.getAllNotes,
    createNote: fromNote.createNote,
  }
)(NoteList);
