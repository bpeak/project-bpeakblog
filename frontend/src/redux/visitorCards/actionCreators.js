import * as actionTypes from './actionTypes'

export const visitorCardsReceived = (payload) => ({
    type : actionTypes.VISITORCARDS_RECEIVED,
    visitorCards : payload.visitorCards
})

export const newVisitorCardReceived = (payload) => ({
    type : actionTypes.NEW_VISITORCARD_RECEIVED,
    visitorCard : payload.visitorCard
})