import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromSelection from '../reducers/selection';

const NoteItem = ({ id, select }) => (
  <li>
    <span className="delete-item">
      <button>X</button>
    </span>
    <button onClick={() => select(id)}>{id}</button>
  </li>
);

NoteItem.propTypes = {
  id: PropTypes.number,
  select: PropTypes.func,
};

NoteItem.defaultProps = {
  id: PropTypes.number,
  select: PropTypes.func,
};

export default connect(null, {
  select: fromSelection.select,
})(NoteItem);
