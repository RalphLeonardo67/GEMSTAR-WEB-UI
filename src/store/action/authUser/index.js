import { authUserActionType } from '../../constants/actionType';
import { axiosInstance } from '../../util/axios';

export const isAuthenticated =
  (userType = 'Costumer') =>
  (dispatch, getState) => {
    return axiosInstance('get', '/auth/authenticated')
      .then(res => res.data)
      .then(res => {
        if (res.success) {
          dispatch({ type: authUserActionType.AUTH_SUCCESS, data: res.user });
        } else {
          dispatch({ type: authUserActionType.AUTH_LOGOUT });
        }
        dispatch({
          type: authUserActionType.SET_AUTHENTICATED,
          data: res.success
        });
        return res.success;
      });
  };

export const registerUser = userData => (dispatch /* , getState */) => {
  console.log("abot",userData)
  return axiosInstance('post', '/auth/register', userData)
    .then(res => {
      dispatch({
        type: authUserActionType.REGISTER_USER
      });
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const loginUser = userData => (dispatch /* , getState */) => {
  return axiosInstance('post', '/auth/login', userData)
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: authUserActionType.LOGIN_USER,
        data: res.data
      });
      dispatch({
        type: authUserActionType.SET_AUTHENTICATED,
        data: res.success
      });
      return res;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const usersDynamicUpdate =
  (elementId, fieldName, newValue) => (dispatch /* , getState */) => {
    const userData = {
      usersId: elementId,
      fieldName,
      value: newValue
    };
    return axiosInstance('put', '/auth/dynamic', userData).then(res => {
      console.log(res);
    });
  };

export const logout = () => (dispatch /* getState */) => {
  return axiosInstance('get', '/auth/logout').then(() => {
    dispatch({
      type: authUserActionType.UNSET_AUTHENTICATED
    });
    dispatch({
      type: authUserActionType.AUTH_LOGOUT
    });
  });
};

export const getEmployeeList = () => (dispatch /* getState */) => {
  dispatch({
    type: authUserActionType.RESET_USER_LIST
  });
  return axiosInstance('get', '/auth/employee')
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: authUserActionType.MERGE_USER_LIST,
        data: res.data
      });
    });
};

export const getAllUserLevel = () => (dispatch /* getState */) => {
  dispatch({
    type: authUserActionType.RESET_USER_LEVELS
  });
  return axiosInstance('get', '/auth/user-levels')
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: authUserActionType.MERGE_USER_LEVELS,
        data: res.data
      });
    });
};

export const getAllUserList = () => (dispatch /* getState */) => {
  dispatch({
    type: authUserActionType.RESET_USER_LIST
  });
  return axiosInstance('get', '/auth/all')
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: authUserActionType.MERGE_USER_LIST,
        data: res.data
      });
    });
};

export const getUserData = userId => (dispatch /* getState */) => {
  dispatch({
    type: authUserActionType.RESET_USER_DATA
  });
  return axiosInstance('get', `/auth/${userId}`)
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: authUserActionType.MERGE_USER_DATA,
        data: res.data
      });
    });
};
