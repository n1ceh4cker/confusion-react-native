import * as ActionTypes from './ActionTypes'

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if(state.some(e => e===action.payload))
                return state
            else
                return [...state, action.payload]
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(e => e!==action.payload)
        default:
            return state
    }
}

