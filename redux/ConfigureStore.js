import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { dishes } from './dishes'
import { comments } from './comments'
import { leaders } from './leaders'
import { promotions } from './promotions'
import { favorites } from './favorites'
import { auth } from './auth'
import { persistCombineReducers, persistStore } from "redux-persist"
import AsyncStorage from '@react-native-community/async-storage'

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config,{
            dishes,
            comments,
            promotions,
            leaders,
            auth,
            favorites
        }),
        applyMiddleware(thunk, logger)
    )
    const persistor = persistStore(store)
    return { persistor, store }
}