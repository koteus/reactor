/*
 * action types
 */

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

/*
 * action creators
 */

export function incrementCounter() {
  return { type: INCREMENT }
}

export function decrementCounter() {
  return { type: DECREMENT }
}