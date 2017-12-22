import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        <button>+</button>
        <ul>{note.items.map(item => <NoteItem key={item.id} {...item} />)}</ul>
      </div>
    );
  }
}

NoteList.propTypes = {
  note: PropTypes.shape(),
  getAllNotes: PropTypes.func,
};

NoteList.defaultProps = {
  note: PropTypes.shape(),
  getAllNotes: PropTypes.func,
};

export default connect(
  state => ({
    note: state.note,
  }),
  {
    getAllNotes: fromNote.getAllNotes,
  }
)(NoteList);
