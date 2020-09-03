import * as ActionTypes from './ActionTypes'

export const comments = (state = { isLoading: true, errMsg: null ,comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMsg: null, comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, comments:[]}
        case ActionTypes.ADD_COMMENT:
            return {...state, comments: [...state.comments, action.payload]}
        default:
            return state
    }
}