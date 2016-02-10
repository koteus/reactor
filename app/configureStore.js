import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

export default function configureStore(initialState) {
  let store;

  if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk))
  }
  else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(require('redux-immutable-state-invariant')(), thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
      });
    }
  }

  return store;
}