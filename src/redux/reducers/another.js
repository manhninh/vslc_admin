import {
  LOADING_VIEW,
  POPUP_ERROR,
  POPUP_SUCCESS,
  NAVIGATION_APP,
  LOGIN_API,
  LOGIN_TOKEN_API,
  CUSTOMERS_API,
  INFO_API,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  popupError: {isShow: false, title: undefined, content: undefined},
  popupSuccess: {isShow: false, title: undefined, content: undefined},
  access_token: 'Basic ZGV2OnNlY3JldDE=',
  dataUser: {
    role: '',
  },
  customers: {
    id: 29,
    lstAddress: [],
    lstFavoriteStaff: undefined,
    lstOrder: [],
    name: '',
    note: undefined,
    phone: '',
    user: {},
  },
  infoUser: {},
};

export default function(state = initialState, action) {
  const {type, response} = action;
  switch (type) {
    case LOADING_VIEW.SHOW: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOADING_VIEW.HIDE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case POPUP_ERROR.SHOW: {
      return {
        ...state,
        popupError: {
          isShow: true,
          title: action.title,
          content: action.content,
        },
      };
    }
    case POPUP_ERROR.HIDE: {
      return {
        ...state,
        popupError: {
          isShow: false,
          title: undefined,
          content: undefined,
        },
      };
    }

    case POPUP_SUCCESS.SHOW: {
      return {
        ...state,
        popupSuccess: {
          isShow: true,
          title: action.title,
          content: action.content,
        },
      };
    }
    case POPUP_SUCCESS.HIDE: {
      return {
        ...state,
        popupSuccess: {
          isShow: false,
          title: undefined,
          content: undefined,
        },
      };
    }
    case NAVIGATION_APP.ROUTE_NAME_SCREEN: {
      return {
        ...state,
        routeName: action.nameScreen,
      };
    }
    case LOGIN_API.SUCCESS: {
      return {
        ...state,
        access_token: 'Bearer ' + response.access_token,
      };
    }
    case LOGIN_TOKEN_API.REQUEST: {
      return {
        ...state,
        access_token: 'Bearer ' + action.token,
      };
    }
    case LOGIN_TOKEN_API.SUCCESS: {
      return {
        ...state,
        dataUser: response,
      };
    }
    case CUSTOMERS_API.SUCCESS: {
      return {
        ...state,
        customers: response,
      };
    }
    case INFO_API.SUCCESS: {
      return {
        ...state,
        infoUser: response,
      };
    }
    default:
      return state;
  }
}
