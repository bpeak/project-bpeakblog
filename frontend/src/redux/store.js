import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './user/reducer'
import postsReducer from './posts/reducer'
import popupsReducer from './popups/reducer'
import urlHistoryReducer from './urlHistory/reducer'
import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    user : userReducer,
    posts : postsReducer,
    popups : popupsReducer,
    urlHistory : urlHistoryReducer
})

const domain = 'www.bpeakBlog.com'
const localStorageUserState = JSON.parse(localStorage.getItem(domain))
const logger = createLogger()
const store = (function(){
    let store
    if(localStorageUserState !== null){
        store = createStore(rootReducer, { user : localStorageUserState }, applyMiddleware(logger, reduxThunk))
    } else {
        store = createStore(rootReducer, applyMiddleware(logger, reduxThunk))
    }
    return store
})()

const userStateObserver = (function(prevUserState){
    const updateLocalStorage = (userState) => {
        window.localStorage.setItem(domain, JSON.stringify(userState))
    }
    const updatePrevUserState = (userState) => {
        prevUserState = userState
    }
    return {
        updateDeterminer : (nextUserState) => {
            if(prevUserState !== nextUserState){
                updateLocalStorage(nextUserState)
                updatePrevUserState(nextUserState)
            }
        }
    }
})(store.getState().user)

store.subscribe(() => {
    userStateObserver.updateDeterminer(store.getState().user)
})

export default store