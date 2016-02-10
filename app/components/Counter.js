import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, decrement, incrementAsync, incrementIfOdd } from '../actions/counter'

const Counter = (props) => (
  <p>
    Clicked: {props.value} times
    {' '}
    <button onClick={props.onIncrement}>
      +
    </button>
    {' '}
    <button onClick={props.onDecrement}>
      -
    </button>
    {' '}
    <button onClick={props.incrementIfOdd}>
      Increment if odd
    </button>
    {' '}
    <button onClick={props.incrementAsync}>
      Increment async
    </button>
  </p>
)

// Counter.propTypes = {
//   value: PropTypes.number.isRequired,
//   onIncrement: PropTypes.func.isRequired,
//   onDecrement: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
  return {
    value: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch(increment())
    },
    onDecrement: () => {
      dispatch(decrement())
    },
    incrementAsync: () => {
      dispatch(incrementAsync())
    },
    incrementIfOdd: () => {
      dispatch(incrementIfOdd())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
