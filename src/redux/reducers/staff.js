import {
  LIST_STAFF_API,
  STATISTICS_STAFF_API,
  STAFF_DETAIL_API,
  LIST_BY_STAFF_API,
  STAFF_WORK_SHIFT_API,
} from '../actions/actionTypes';

const initialState = {
  listStaff: {
    list: [],
    count: 0,
  },
  statistics: {
    staffAssigned: 0,
    staffCancel: 0,
    staffNotAssigned: 0,
    staffOnLeave: 0,
    staffQuit: 0,
    total: 0,
  },
  isLoadListstaff: false,
  staffDetail: {},
  listByStaff: {
    list: [],
    count: 0,
  },
  staffWorkShift: {
    list: [],
    count: 0,
  },
  isLoadStaffWorkShift: false,
};

export default function(state = initialState, action) {
  const {type, response, loadMore} = action;
  switch (type) {
    case LIST_STAFF_API.SUCCESS: {
      return {
        ...state,
        isLoadListstaff: false,
        listStaff: loadMore
          ? {
              list: [...state.listStaff.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case LIST_STAFF_API.REQUEST: {
      return {
        ...state,
        isLoadListstaff: true,
      };
    }
    case LIST_STAFF_API.FAILURE: {
      return {
        ...state,
        isLoadListstaff: false,
      };
    }
    case STATISTICS_STAFF_API.SUCCESS: {
      return {
        ...state,
        statistics: response,
      };
    }
    case STAFF_DETAIL_API.SUCCESS: {
      return {
        ...state,
        staffDetail: response,
      };
    }
    case LIST_BY_STAFF_API.SUCCESS: {
      return {
        ...state,
        listByStaff: loadMore
          ? {
              list: [...state.listByStaff.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case STAFF_WORK_SHIFT_API.SUCCESS: {
      return {
        ...state,
        isLoadStaffWorkShift: false,
        staffWorkShift: loadMore
          ? {
              list: [...state.staffWorkShift.list, ...response.list],
              count: response.count,
            }
          : response,
      };
    }
    case STAFF_WORK_SHIFT_API.REQUEST: {
      return {
        ...state,
        isLoadStaffWorkShift: true,
      };
    }
    case STAFF_WORK_SHIFT_API.FAILURE: {
      return {
        ...state,
        isLoadStaffWorkShift: false,
      };
    }
    default:
      return state;
  }
}
