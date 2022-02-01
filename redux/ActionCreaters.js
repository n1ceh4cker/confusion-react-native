import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';

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


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment 
})

export const postComment = (dish, rating, comment) => (dispatch) => {
    const newComment = { dish, rating, comment }
    SecureStore.getItemAsync('token')
    .then(token => {
        const bearer = 'Bearer ' + token;
        return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
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

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in secure storage
            promise1 = SecureStore.setItemAsync('token', response.token);
            promise2 = SecureStore.setItemAsync('creds', JSON.stringify(creds));
            Promise.all([promise1, promise2])
            .then(resp => {
                // Dispatch the success action
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            })
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    promise1 = SecureStore.deleteItemAsync('token');
    promise2 = SecureStore.deleteItemAsync('creds');
    promise3 = SecureStore.deleteItemAsync('root')
    Promise.all([promise1, promise2,promise3])
    .then(resp => {
        dispatch(favoritesFailed("Error 401: Unauthorized"));
        dispatch(receiveLogout())
    })
}

export const postFavorite = (dishId) => (dispatch) => {

    SecureStore.getItemAsync('token')
    .then(token => {
        const bearer = 'Bearer ' + token;
        return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
        })
    })    
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    SecureStore.getItemAsync('token')
    .then(token => {
        const bearer = 'Bearer ' + token;
        return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

  SecureStore.getItemAsync('token')
    .then(token => {
      const bearer = 'Bearer ' + token;
      return fetch(baseUrl + 'favorites', {
        headers: {
          'Authorization': bearer
        },
      })
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(favorites => { console.log(favorites); dispatch(addFavorites(favorites)) })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});