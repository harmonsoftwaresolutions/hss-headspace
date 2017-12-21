const MESSAGE_SHOW = 'MESSAGE_SHOW';

export const showMessage = msg => ({ type: MESSAGE_SHOW, msg });

export default (state = '', action) => {
  switch (action.type) {
    case MESSAGE_SHOW:
      return action.msg;
    default:
      return state;
  }
};
