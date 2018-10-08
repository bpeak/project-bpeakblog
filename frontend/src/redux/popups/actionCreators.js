import * as actionTypes from './actionTypes'

const uniqueIdCreator = () => {
    const unique_id = Math.random().toString(36) + String(Number(new Date()))
    return unique_id
}

export const openPopup = (payload) => {
    return ({
        type : actionTypes.OPEN_POPUP,
        popupType : payload.popupType,
        unique_id : uniqueIdCreator(),
        icon : payload.icon,
        title : payload.title,
        description : payload.description,
        imgName : payload.imgName
    })
}

export const closePopup = (payload) => {
    return ({
        type : actionTypes.CLOSE_POPUP,
        unique_id : payload.unique_id
    })
}