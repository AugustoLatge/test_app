import { CALCULATE } from "../actions/calculate";

const initialState = {
  results: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE:
      const newState = {
        ...state,
        results: action.results
      };
      return newState;
    default:
      return state;
  }
};