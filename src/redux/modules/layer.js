import _ from 'lodash'
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
    dispatch(layerAdd(layerID))
  }
}

export function removeLayer (layerID) {
  return (dispatch) => {
    dispatch(layerRemove(layerID))
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
  layers: []
}, action) {
  let newLayerList
  switch (action.type) {
    case LAYER_ADD:
      newLayerList = this.state.layers.push(action.layerID)
      return Object.assign({}, state, {
        layers: newLayerList
      })
    case LAYER_REMOVE:
      newLayerList = this.state.layers
      _.remove(newLayerList, (layer) => { return layer.id === action.layerID })
      return Object.assign({}, state, {
        layers: newLayerList
      })
    default:
      return state
  }
}
