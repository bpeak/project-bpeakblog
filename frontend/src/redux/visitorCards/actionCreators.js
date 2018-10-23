import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const visitorCardsReceived = createAction(actionTypes.VISITORCARDS_RECEIVED)
export const newVisitorCardReceived = createAction(actionTypes.NEW_VISITORCARD_RECEIVED)

// export const visitorCardsReceived = (payload) => ({
//     type : actionTypes.VISITORCARDS_RECEIVED,
//     visitorCards : payload.visitorCards
// })

// export const newVisitorCardReceived = (payload) => ({
//     type : actionTypes.NEW_VISITORCARD_RECEIVED,
//     visitorCard : payload.visitorCard
// })