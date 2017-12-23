export const SELECT = 'SELECT';
export const select = id => ({ type: SELECT, id });

export default function(state = -1, action) {
  switch (action.type) {
    case SELECT:
      return action.id;
    default:
      return state;
  }
}
