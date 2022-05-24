import { carouselActionType } from '../../constants/actionType';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case carouselActionType.MERGE_CAROUSEL:
      return action.data;
    case carouselActionType.RESET_CAROUSEL:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
