import {
  SET_ADMIN_DATA,
  SET_ADMIN_LIST_DATA,
  REMOVE_ADMIN_DATA,
  ADMIN_LOGGED_OUT,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_LOADING,
  ADD_ADMIN_ERROR,
  SET_ADMIN_UPDATING,
  REMOVE_ADMIN_UPDATING,
  RESET_DATA,
  RESET_LOADING_STATE,
} from "../actions/adminActions";

const initialState = {
  data: {},
  list: [],
  updatedAdmin: null,
  adding: {
    loading: false,
    success: false,
    error: null,
  },
};

const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }

    case RESET_LOADING_STATE: {
      return {
        ...state,
        adding: {
          loading: false,
          success: false,
          error: null,
        },
      };
    }

    case SET_ADMIN_UPDATING: {
      return {
        ...state,
        updatedAdmin: action.data,
      };
    }

    case REMOVE_ADMIN_UPDATING: {
      return {
        ...state,
        updatedAdmin: null,
      };
    }

    case SET_ADMIN_LIST_DATA: {
      return {
        ...state,
        list: action.data,
      };
    }
    case REMOVE_ADMIN_DATA: {
      return {
        ...state,
      };
    }
    case ADMIN_LOGGED_OUT: {
      return state;
    }
    case ADD_ADMIN_LOADING: {
      return {
        ...state,
        adding: { loading: true },
      };
    }
    case ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        adding: { success: true, loading: false },
      };
    }

    case ADD_ADMIN_ERROR: {
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
