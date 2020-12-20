import {
  LOADING_VIEW,
  POPUP_ERROR,
  POPUP_SUCCESS,
  NAVIGATION_APP,
  LOGIN_API,
  REGISTER_API,
  LOGIN_TOKEN_API,
  UPDATE_FCM_TOKEN_API,
  CUSTOMERS_API,
  INFO_API,
} from './actionTypes';

export const showLoading = () => ({
  type: LOADING_VIEW.SHOW,
});

export const hideLoading = () => ({
  type: LOADING_VIEW.HIDE,
});

export const showPopupError = (title, content) => ({
  type: POPUP_ERROR.SHOW,
  title,
  content,
});

export const hidePopupError = () => ({
  type: POPUP_ERROR.HIDE,
});

export const showPopupSuccess = (title, content) => ({
  type: POPUP_SUCCESS.SHOW,
  title,
  content,
});

export const hidePopupSuccess = () => ({
  type: POPUP_SUCCESS.HIDE,
});

export const NavigationRouter = (nameScreen, dataParams) => ({
  type: NAVIGATION_APP.NAVIGATE,
  nameScreen,
  dataParams,
});

export const NavigationBack = () => ({
  type: NAVIGATION_APP.BACK,
});

export const NavigationReset = nameScreen => ({
  type: NAVIGATION_APP.RESET,
  nameScreen,
});

export const NavigationReplace = nameScreen => ({
  type: NAVIGATION_APP.REPLACE,
  nameScreen,
});

export const TextHeaderScreen = nameScreen => ({
  type: NAVIGATION_APP.ROUTE_NAME_SCREEN,
  nameScreen,
});

export function loginApiSuccess(response) {
  return {
    type: LOGIN_API.SUCCESS,
    response,
  };
}

export function loginApiFailure(error) {
  return {
    type: LOGIN_API.FAILURE,
    error,
  };
}

export function loginApiSubmit(username, password) {
  return {
    type: LOGIN_API.REQUEST,
    username,
    password,
  };
}

export function registerApiSuccess(response) {
  return {
    type: REGISTER_API.SUCCESS,
    response,
  };
}

export function registerApiFailure(error) {
  return {
    type: REGISTER_API.FAILURE,
    error,
  };
}

export function registerApiSubmit(phone, name) {
  return {
    type: REGISTER_API.REQUEST,
    phone,
    name,
  };
}

export function loginTokenApiSuccess(response) {
  return {
    type: LOGIN_TOKEN_API.SUCCESS,
    response,
  };
}

export function loginTokenApiSubmit(token) {
  return {
    type: LOGIN_TOKEN_API.REQUEST,
    token,
  };
}

export function updateFcmTokenApiSuccess(response) {
  return {
    type: UPDATE_FCM_TOKEN_API.SUCCESS,
    response,
  };
}

export function updateFcmTokenApiSubmit(fcmToken) {
  return {
    type: UPDATE_FCM_TOKEN_API.REQUEST,
    fcmToken,
  };
}

export function customersApiSuccess(response) {
  return {
    type: CUSTOMERS_API.SUCCESS,
    response,
  };
}

export function customersApiFailure(error) {
  return {
    type: CUSTOMERS_API.FAILURE,
    error,
  };
}

export function customersApiSubmit() {
  return {
    type: CUSTOMERS_API.REQUEST,
  };
}

export function infoApiSuccess(response) {
  return {
    type: INFO_API.SUCCESS,
    response,
  };
}

export function infoApiFailure(error) {
  return {
    type: INFO_API.FAILURE,
    error,
  };
}

export function infoApiSubmit() {
  return {
    type: INFO_API.REQUEST,
  };
}
