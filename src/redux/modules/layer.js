import _ from 'lodash'
import 'whatwg-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const LAYER_ADD = 'LAYER_ADD'
export const LAYER_REMOVE = 'LAYER_REMOVE'

// ------------------------------------
// Actions
// ------------------------------------
function layerAdd (layerID): Action {
  return {
    type: LAYER_ADD,
    layerID
  }
}

function layerRemove (layerID): Action {
  return {
    type: LAYER_REMOVE,
    layerID
  }
}

export function addLayer (layerID) {
  return (dispatch) => {
    return dispatch(layerAdd(layerID))
  }
}

export function removeLayer (layerID) {
  return (dispatch) => {
    return dispatch(layerRemove(layerID))
  }
}

export const actions = {
  layerAdd,
  layerRemove
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function layer (state = {
  layers: ['surveys', 'auditPoints', 'auditPolygons']
}, action) {
  let newLayerList = []
  switch (action.type) {
    case LAYER_ADD:
      newLayerList = state.layers.slice(0)
      newLayerList.push(action.layerID)
      return Object.assign({}, state, {
        layers: newLayerList
      })
    case LAYER_REMOVE:
      newLayerList = state.layers.slice(0)
      _.remove(newLayerList, (layer) => { return layer === action.layerID })
      return Object.assign({}, state, {
        layers: newLayerList
      })
    default:
      return state
  }
}
