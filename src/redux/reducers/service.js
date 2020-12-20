import {
  HISTORY_SERVICE_API,
  LIST_SERVICE_API,
  ORDERS_ID_API,
  ORDERS_DETAIL_ID_API,
  LIST_FAVARITE_STAFF_API,
} from '../actions/actionTypes';

const initialState = {
  listHistoryService: {
    list: [],
    count: 0,
  },
  listService: {
    list: [],
    count: 0,
  },
  isLoadListService: false,
  listFavatiteStaff: {
    list: [],
    count: 0,
  },
  ordersId: {},
  ordersDetailId: {},
};

export default function(state = initialState, action) {
  const {type, response, loadMore} = action;
  switch (type) {
    case HISTORY_SERVICE_API.SUCCESS: {
      return {
        ...state,
        listHistoryService: loadMore
          ? {
              list: [...state.listHistoryService.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case LIST_SERVICE_API.SUCCESS: {
      return {
        ...state,
        isLoadListService: false,
        listService: loadMore
          ? {
              list: [...state.listService.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case LIST_SERVICE_API.REQUEST: {
      return {
        ...state,
        isLoadListService: true,
      };
    }
    case LIST_SERVICE_API.FAILURE: {
      return {
        ...state,
        isLoadListService: false,
      };
    }
    case LIST_FAVARITE_STAFF_API.SUCCESS: {
      return {
        ...state,
        listFavatiteStaff: loadMore
          ? {
              list: [...state.listFavatiteStaff.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case ORDERS_ID_API.SUCCESS: {
      return {
        ...state,
        ordersId: response,
      };
    }
    case ORDERS_DETAIL_ID_API.SUCCESS: {
      return {
        ...state,
        ordersDetailId: response,
      };
    }
    default:
      return state;
  }
}
