import * as ActionTypes from './ActionTypes'

export const favorites = (state = { isLoading: true, errMsg: null, favorites:[] }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITES:
            return {...state, isLoading: false, errMsg: null, favorites: action.payload.dishes}
        case ActionTypes.FAVORITES_LOADING:
            return {...state, isLoading: true, errMsg: null, favorites: []}
        case ActionTypes.FAVORITES_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, favorites: []}
        default:
            return state
    }
}

