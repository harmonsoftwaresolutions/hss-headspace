import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromSelection from '../reducers/selection';
import * as fromNote from '../reducers/note';
import * as fromEditor from '../reducers/editor';

const NoteItem = ({ id, select, getNote, loadEditor }) => (
  <li>
    <span className="delete-item">
      <button>X</button>
    </span>
    <button
      onClick={async () => {
        select(id);
        const content = await getNote(id);
        loadEditor(content);
      }}
    >
      {id}
    </button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  select: PropTypes.func,
  getNote: PropTypes.func,
  loadEditor: PropTypes.func,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  select: PropTypes.func,
  getNote: PropTypes.func,
  loadEditor: PropTypes.func,
};

export default connect(null, {
  select: fromSelection.select,
  getNote: fromNote.getNote,
  loadEditor: fromEditor.loadEditor,
})(NoteItem);
