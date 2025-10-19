import { createStore } from 'redux';

const initialState = {
  photos: [],
  tags: [],
  selection: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PHOTOS':
      return { ...state, photos: action.photos };
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
