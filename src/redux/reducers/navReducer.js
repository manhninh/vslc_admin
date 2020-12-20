// import {NavigationActions, StackActions} from 'react-navigation';
import {RootNavigator} from '../../navigations/AppNavigation';

// const popNavigation = (stateCurrent, toIndex) => {
//   try {
//     if (toIndex >= stateCurrent.index) {
//       return stateCurrent;
//     }
//     const {routes} = stateCurrent;
//     const filterRouter = routes.filter((i, index) => index <= toIndex);
//     const result = {...stateCurrent, index: toIndex, routes: filterRouter};
//     return result;
//   } catch (error) {
//     return stateCurrent;
//   }
// };
export default (state, action) => {
  const {type} = action;
  let newState;
  switch (type) {
    // case NAVIGATION_APP.POP_CUSTOMS:
    //   const nav = (newState = RootNavigator.router.getStateForAction(action, state));
    //   newState = popNavigation(nav, action.toIndex);
    //   break;

    default:
      newState = RootNavigator.router.getStateForAction(action, state);
      break;
  }
  return newState || state;
};
