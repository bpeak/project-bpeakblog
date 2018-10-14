import * as actionTypes from './actionTypes'

const defaultState = { isOpendModalBlogMenu : false }

const reducer = (state = defaultState, action) => {
    if(action.type === actionTypes.OPEN_MODAL_BLOG_MENU){
        return ({ isOpendModalBlogMenu : true })
    } else if (action.type === actionTypes.CLOSE_MODAL_BLOG_MENU){
        return ({ isOpendModalBlogMenu : false })
    } else {
        return state
    }
}

export default reducer