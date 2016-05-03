/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SURVEY_SUBMIT = 'SURVEY_SUBMIT'
export const SURVEY_SAVED = 'SURVEY_SAVED'
export const SURVEYS_REQUEST = 'SURVEYS_REQUEST'

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

function surveySaved (survey): Action {
  return {
    type: SURVEY_SAVED,
    isFetching: false,
    survey
  }
}

function surveysRequest (bounds): Action {
  return {
    type: SURVEYS_REQUEST,
    isFetching: true,
    bounds
  }
}

export function requestSurveys (bounds) {
  console.log(bounds)
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let queryString = 'http://localhost:3000/api/surveys?a=' +
    `${bounds[0]}&b=${bounds[1]}&c=${bounds[2]}&d=${bounds[3]}&e=${bounds[4]}`
  return (dispatch) => {
    dispatch(surveysRequest(bounds))
    return fetch(queryString, config)
      .then((response) => response.json()).then((surveys) => console.log(surveys))
  }
}

export function surveySave (responses) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `lat=${responses.geoCoordinates[1]}&lon=${responses.geoCoordinates[0]}&employment=${responses.employment}&healthcare=${responses.healthcare}&family=${responses.family}&stability=${responses.stability}&relationships=${responses.relationships}&recreation=${responses.recreation}&education=${responses.education}&vacation=${responses.vacation}&housing=${responses.housing}&environment=${responses.environment}&discrimination=${responses.discrimination}&religion=${responses.religion}&mobility=${responses.mobility}&movement=${responses.movement}&safety=${responses.safety}&governance=${responses.governance}&`
    // body: responses
  }
  return (dispatch) => {
    dispatch(submitSurvey(responses))
    return fetch('http://localhost:3000/api/survey/create', config)
      .then((response) => dispatch(surveySaved))
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
  submitSurvey,
  surveySaved,
  surveysRequest
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
    case SURVEY_SAVED:
      return Object.assign({}, state, {
        isFetching: false,
        survey: action.survey
      })
    case SURVEYS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        bounds: actions.bounds
      })
    default:
      return state
  }
}
