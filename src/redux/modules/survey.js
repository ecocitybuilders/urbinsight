/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SURVEY_SUBMIT = 'SURVEY_SUBMIT'

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.

function submitSurvey (responses): Action {
  return {
    type: SURVEY_SUBMIT,
    isFetching: true,
    responses
  }
}

export function surveySave (responses) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // body: `username=${creds.username}&password=${creds.password}`
  }
  return (dispatch) => {
    dispatch(submitSurvey(responses))
    return fetch('http://localhost:3000/api/survey/create', config)
      .then((response) => console.log(response))
  }
}
// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
// export const doubleAsync = (): Function => {
//   return (dispatch: Function, getState: Function): Promise => {
//     return new Promise((resolve: Function): void => {
//       setTimeout(() => {
//         dispatch(increment(getState().counter))
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  submitSurvey
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {
//   [COUNTER_INCREMENT]: (state: number, action: {payload: number}): number => state + action.payload
// }

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = 0
// export default function counterReducer (state: number = initialState, action: Action): number {
//   const handler = ACTION_HANDLERS[action.type]
//
//   return handler ? handler(state, action) : state
// }
export default function survey (state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case SURVEY_SUBMIT:
      return Object.assign({}, state, {
        isFetching: true,
        surveyResponses: action.responses
      })
    default:
      return state
  }
}
