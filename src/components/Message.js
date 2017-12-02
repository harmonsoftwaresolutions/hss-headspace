import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = ({ message }) =>
  message ? <span className="message">{message}</span> : null;

Message.propTypes = {
  message: PropTypes.string,
};

Message.defaultProps = {
  message: PropTypes.string,
};

export default connect(state => ({ message: state.message }))(Message);
