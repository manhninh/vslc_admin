import {connect} from 'react-redux';

import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {RootNavigator} from './RootNavigator';

const RootNavMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const mapStateToProps = state => ({
  state: state.nav,
});

const RootWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const RootNavigation = connect(mapStateToProps)(RootWithNavigationState);

export {RootNavigation, RootNavMiddleware, RootNavigator};
