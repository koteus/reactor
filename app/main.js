import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import configureStore from './configureStore';

const store = configureStore();
const rootEl = document.getElementById('root')

function render() {
  const state = store.getState()
  ReactDOM.render(
    <Counter
      value = { state.counter }
      onIncrement = { () => store.dispatch({ type: 'INCREMENT' }) }
      onDecrement = { () => store.dispatch({ type: 'DECREMENT' }) }
    />,
    rootEl
  )
}

render()
store.subscribe(render)