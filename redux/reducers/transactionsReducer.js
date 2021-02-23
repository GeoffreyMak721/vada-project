import {
  ADD_TRANSACTION_ERROR,
  ADD_TRANSACTION_LOADING,
  ADD_TRANSACTION_SUCCESS,
  SET_TRANSACTION_DATA,
  RESET_DATA,
} from "../actions/transactionActions";

const initialState = {
  data: {},
  adding: {
    loading: false,
    success: false,
    error: null,
  },
};

const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }

    case ADD_TRANSACTION_LOADING: {
      return {
        ...state,
        adding: { loading: true },
      };
    }

    case ADD_TRANSACTION_SUCCESS: {
      return {
        ...state,
        adding: { success: true, loading: false },
      };
    }

    case ADD_TRANSACTION_ERROR: {
      return {
        ...state,
        adding: { success: false, loading: false, error: action.data },
      };
    }

    case RESET_DATA: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default adminReducer;
