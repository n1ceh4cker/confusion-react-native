import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl';

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
})

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok){
            return response
        } else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
         }
        },
        error =>{
            let errmsg = new Error(error.message)
            throw errmsg
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}


export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
})

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())
    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response
        } else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
         }
        },
        error =>{
            let errmsg = new Error(error.message)
            throw errmsg
    })
    .then(response => response.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(error => dispatch(promosFailed(error.message)))
}


export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())
    return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok){
            return response
        } else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
         }
        },
        error =>{
            let errmsg = new Error(error.message)
            throw errmsg
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmsg
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'leaders')
    .then(response => {
        if(response.ok){
            return response
        } else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
         }
        },
        error =>{
            let errmsg = new Error(error.message)
            throw errmsg
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

export const addFavorites = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

export const postFavorites = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorites(dishId))
    }, 2000);
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment 
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = { dishId, rating, author, comment }
    newComment.date = new Date().toISOString()
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response
        } else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
         }
        },
        error =>{
            throw error
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Comment cannot be posted: ' + error.message)})
    
}