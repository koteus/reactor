import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { syncHistory } from 'react-router-redux'

export default function configureStore(initialState, history) {
  let store

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history)

  if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk, reduxRouterMiddleware))
  }
  else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(require('redux-immutable-state-invariant')(), thunk, reduxRouterMiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ))

    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays(store)

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers')
        store.replaceReducer(nextReducer)
      })
    }
  }

  return store
}