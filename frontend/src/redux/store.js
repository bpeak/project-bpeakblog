import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './user/reducer'
import postsReducer from './posts/reducer'
import visitorCardsReducer from './visitorCards/reducer'
import popupsReducer from './popups/reducer'
import modalsReducer from './modals/reducer'
import urlHistoryReducer from './urlHistory/reducer'

import { createLogger } from 'redux-logger'

const rootReducer = combineReducers({
    user : userReducer,
    posts : postsReducer,
    visitorCards : visitorCardsReducer,
    popups : popupsReducer,
    modals : modalsReducer,
    urlHistory : urlHistoryReducer
})

const localStorageUser = JSON.parse(localStorage.getItem('user'))
const localStorageUrlHistory = JSON.parse(localStorage.getItem('urlHistory'))

const logger = createLogger()

const prevStoreState = (function () {
    const prevStoreState = {}
    if(localStorageUser){ prevStoreState.user = localStorageUser } 
    if(localStorageUrlHistory){ prevStoreState.urlHistory = localStorageUrlHistory }
    return prevStoreState
})()

const store = (function(){
    let store
    if(Object.keys(prevStoreState).length !== 0){
        store = createStore(rootReducer, prevStoreState, applyMiddleware(logger))
        // store = createStore(rootReducer, prevStoreState)
    } else {
        store = createStore(rootReducer, applyMiddleware(logger))
        // store = createStore(rootReducer)
    }
    return store
})()

const userStateObserver = (function(prevUserState){
    const updateLocalStorage = (userState) => {
        window.localStorage.setItem('user', JSON.stringify(userState))
    }
    const updatePrevUserState = (userState) => {
        prevUserState = userState
    }

    return function (nextUserState) {
        if(prevUserState !== nextUserState){
            updateLocalStorage(nextUserState)
            updatePrevUserState(nextUserState)
        }
    }
})(store.getState().user)

const urlHistoryObserver = (function (prevUrlHistory) {
    const updateLocalStorageUrlHistory = (urlHistory) => {
        localStorage.setItem('urlHistory', JSON.stringify(urlHistory))
    }
    const updatePrevUrlHistory = (urlHistory) => {
        prevUrlHistory = urlHistory
    }

    return function (nextUrlHistory) {
        if(prevUrlHistory !== nextUrlHistory){
            updatePrevUrlHistory(nextUrlHistory)
            updateLocalStorageUrlHistory(nextUrlHistory)
        }
    }

})(store.getState().urlHistory)

store.subscribe(() => {
    userStateObserver(store.getState().user)
    urlHistoryObserver(store.getState().urlHistory)
})

export default store