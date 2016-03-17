import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState, history) {
  let store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, initialState,
      applyMiddleware(thunkMiddleware), routerMiddleware(history))
  }
  else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(
        require('redux-immutable-state-invariant')(),
        thunkMiddleware,
        routerMiddleware(history)
      ),
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ))
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}