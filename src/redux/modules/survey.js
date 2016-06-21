/* @flow */
import 'whatwg-fetch'
import server_endpoint from 'utils/serverUtils'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const SURVEY_SUBMIT = 'SURVEY_SUBMIT'
export const SURVEY_SAVED = 'SURVEY_SAVED'
export const SURVEY_DELETE = 'SURVEY_DELETE'
export const SURVEY_DELETED = 'SURVEY_DELETED'
export const SURVEY_UPDATE_REQUEST = 'SURVEY_UPDATE_REQUEST'
export const SURVEY_UPDATE_RECEIVED = 'SURVEY_UPDATE_RECEIVED'
export const SURVEYS_REQUEST = 'SURVEYS_REQUEST'
export const SURVEYS_RECEIVED = 'SURVEYS_RECEIVED'
export const SURVEY_FORM_SAVE = 'SURVEY_FORM_SAVE'
export const SURVEY_FORM_RESET = 'SURVEY_FORM_RESET'

const surveyCacheLookup = {}
const surveyCache = []
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.

function surveySubmit (responses): Action {
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

function surveyDelete (id): Action {
  return {
    type: SURVEY_DELETE,
    id
  }
}

function surveyDeleted (): Action {
  return {
    type: SURVEY_DELETED
  }
}

function surveyUpdateRequest (responses): Action {
  return {
    type: SURVEY_UPDATE_REQUEST,
    responses
  }
}

function surveyUpdateReceived (survey): Action {
  return {
    type: SURVEY_UPDATE_RECEIVED,
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

function surveysReceived (surveys): Action {
  return {
    type: SURVEYS_RECEIVED,
    isFetching: false,
    surveys
  }
}

function surveyFormSave (responses): Action {
  return {
    type: SURVEY_FORM_SAVE,
    responses
  }
}

function surveyFormReset (): Action {
  return {
    type: SURVEY_FORM_RESET
  }
}

export function requestSurveys (bounds) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let queryString = 'http://' + server_endpoint + ':8000/api/surveys?a=' +
    `${bounds[0]}&b=${bounds[1]}&c=${bounds[2]}&d=${bounds[3]}&e=${bounds[4]}`
  return (dispatch) => {
    dispatch(surveysRequest(bounds))
    return fetch(queryString, config)
      .then((response) => response.json()).then((surveys) => dispatch(surveysReceived(surveys)))
  }
}

export function surveySave (responses) {
  let interimResponses = responses
  interimResponses.user = localStorage.getItem('id_token')
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(interimResponses)
  }
  return (dispatch) => {
    dispatch(surveySubmit(responses))
    return fetch('http://' + server_endpoint + ':8000/api/survey/create', config)
      .then((response) => response.json()).then((survey) => dispatch(surveySaved(survey)))
  }
}
export function deleteSurvey (id) {
  let config = {
    method: 'DELETE',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  return (dispatch) => {
    dispatch(surveyDelete(id))
    return fetch('http://' + server_endpoint + ':8000/api/survey/' + id, config)
      .then((response) => dispatch(surveyDeleted()))
  }
}

export function updateSurvey (responses) {
  let config = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    mode: 'cors',
    body: JSON.stringify(responses)
  }
  return (dispatch) => {
    dispatch(surveyUpdateRequest(responses))
    return fetch('http://' + server_endpoint + ':8000/api/survey/' + responses._id, config)
      .then((response) => response.json()).then((survey) => dispatch(surveyUpdateReceived(survey)))
  }
}
export function saveSurveyForm (responses) {
  return (dispatch) => {
    dispatch(surveyFormSave(responses))
  }
}

export function resetSurveyForm (responses) {
  return (dispatch) => {
    dispatch(surveyFormReset())
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
  surveySubmit,
  surveySaved,
  surveyDelete,
  surveyDeleted,
  surveyUpdateRequest,
  surveyUpdateReceived,
  surveysRequest,
  surveysReceived,
  surveyFormSave,
  surveyFormReset
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
  isFetching: false,
  surveys: []
}, action) {
  let cumlatativeSurvey
  let newSurveyCache
  switch (action.type) {
    case SURVEY_SUBMIT:
      return Object.assign({}, state, {
        isFetching: true,
        surveyResponses: action.responses
      })
    case SURVEY_SAVED:
      surveyCacheLookup[action.survey.survey._id] = true
      surveyCache.push(action.survey.survey)
      newSurveyCache = _.clone(surveyCache)
      return Object.assign({}, state, {
        isFetching: false,
        surveys: newSurveyCache
      })
    case SURVEY_DELETE:
      surveyCacheLookup[action.id] = undefined
      _.remove(surveyCache, function (survey) {
        return survey._id === action.id
      })
      newSurveyCache = _.clone(surveyCache)
      return Object.assign({}, state, {
        surveys: newSurveyCache
      })
    case SURVEY_DELETED:
      return Object.assign({}, state, {
        surveys: surveyCache
      })
    case SURVEY_UPDATE_REQUEST:
      surveyCacheLookup[action.responses._id] = undefined
      _.remove(surveyCache, function (survey) {
        return survey._id === action.responses._id
      })
      return Object.assign({}, state, {
        surveys: surveyCache
      })
    case SURVEY_UPDATE_RECEIVED:
      surveyCacheLookup[action.survey.survey._id] = true
      surveyCache.push(action.survey.survey)
      newSurveyCache = _.clone(surveyCache)
      return Object.assign({}, state, {
        isFetching: false,
        surveys: newSurveyCache
      })
    case SURVEYS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        bounds: action.bounds
      })
    case SURVEYS_RECEIVED:
      action.surveys.surveys.forEach(function (survey) {
        if (typeof surveyCacheLookup[survey._id] === 'undefined') {
          surveyCacheLookup[survey._id] = true
          surveyCache.push(survey)
        }
      })
      newSurveyCache = _.clone(surveyCache)
      return Object.assign({}, state, {
        isFetching: false,
        surveys: newSurveyCache
      })
    case SURVEY_FORM_SAVE:
      state.survey_form
        ? cumlatativeSurvey = Object.assign({}, state.survey_form, action.responses)
        : cumlatativeSurvey = action.responses
      return Object.assign({}, state, {
        inProgress: true,
        survey_form: cumlatativeSurvey
      })
    case SURVEY_FORM_RESET:
      return Object.assign({}, state, {
        survey_form: {}
      })
    default:
      return state
  }
}
