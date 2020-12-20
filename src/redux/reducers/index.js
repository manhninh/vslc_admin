import {combineReducers} from 'redux';
import nav from './navReducer';
import another from './another';
import category from './category';
import publicc from './public';
import service from './service';
import staff from './staff';

const rootReducer = combineReducers({
  nav,
  another,
  category,
  publicc,
  service,
  staff,
});

export default rootReducer;
