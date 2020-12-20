import {
  LIST_NOTIFICATIONS_API,
  LIST_FREE_WORK_API,
  SEARCH_CUSTOMER_API,
  ADDRESS_CUSTOMER_API,
  CUSTOMER_DETAIL_API,
} from '../actions/actionTypes';

const initialState = {
  listNotifications: {
    list: [],
    count: 0,
  },
  isLoadListNotifi: false,
  listFreeWork: [],
  listSearchCustomer: {
    list: [],
    count: 0,
  },
  isLoadSearch: false,
  listAddressCustomer: [],
  customerDetail: {
    lstAddress: [],
  },
};

export default function(state = initialState, action) {
  const {type, response, loadMore} = action;
  switch (type) {
    case LIST_NOTIFICATIONS_API.SUCCESS: {
      return {
        ...state,
        isLoadListNotifi: false,
        listNotifications: loadMore
          ? {
              list: [...state.listNotifications.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case LIST_FREE_WORK_API.SUCCESS: {
      return {
        ...state,
        listFreeWork: response.list,
      };
    }
    case SEARCH_CUSTOMER_API.SUCCESS: {
      return {
        ...state,
        isLoadSearch: false,
        listSearchCustomer: loadMore
          ? {
              list: [...state.listSearchCustomer.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case SEARCH_CUSTOMER_API.REQUEST: {
      return {
        ...state,
        isLoadSearch: true,
      };
    }
    case SEARCH_CUSTOMER_API.FAILURE: {
      return {
        ...state,
        isLoadSearch: false,
      };
    }
    case ADDRESS_CUSTOMER_API.SUCCESS: {
      return {
        ...state,
        listAddressCustomer: response,
      };
    }
    case CUSTOMER_DETAIL_API.SUCCESS: {
      return {
        ...state,
        customerDetail: response,
      };
    }
    default:
      return state;
  }
}
