import {createStore, applyMiddleware, compose} from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {RootNavMiddleware} from '../navigations/AppNavigation';
import AsyncStorage from '@react-native-community/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const middlewares = [];
  const enhancers = [];
  middlewares.push(sagaMiddleware);
  middlewares.push(RootNavMiddleware);
  if (__DEV__) {
    // logged data in Redux Tools
    enhancers.push(composeWithDevTools(applyMiddleware(...middlewares)));
  } else {
    enhancers.push(applyMiddleware(...middlewares));
  }

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
