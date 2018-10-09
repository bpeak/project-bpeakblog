import store from '~redux/store'
import * as userActionCreators from '~redux/user/actionCreators'
import * as popupsActionCreators from '~redux/popups/actionCreators'

class CustomError {
    constructor(name, message){
        this.name = name
        this.message = message
    }
}

const openPopupForFetchError = (title, description) => {
    store.dispatch(popupsActionCreators.openPopup({
        unique_id : String(Number(new Date())),
        popupType : "ALERT",
        imgName : 'warning',
        title,
        description,
    }))
}

const logoutSuccess = () => {
    store.dispatch(userActionCreators.logoutSuccess())
}

const fetchedDataMiddleware = (data, fetchName) => {
    const statusCode = Number(data.status)
    if(statusCode >= 200 && statusCode < 300){
        return data
    } else if (statusCode === 400){
        throw new CustomError('BAD REQUEST', `"${fetchName}" 에 대한 작업이 잘못된 요청으로인해 수행되지 못했습니다.`)
    } else if (statusCode === 401){
        logoutSuccess()
        throw new CustomError('UNAUTHENTICATED' `${fetchName}에 대한 작업은 로그인이 필요합니다.`)
    } else if (statusCode === 403){
        throw new CustomError('FORBIDDEN', '접근 권한이 없습니다.')
    } else if (statusCode === 410){
        throw new CustomError('RESOURCE GONE', `${fetchName}에 대한 작업대상의 리소스가 존재하지 않습니다.`)
    } else if (statusCode === 500){
        throw new CustomError('INTERVAL SERVER ERROR', `"${fetchName}" 에 대한 작업수행중 내부 서버 오류가 발생했습니다.`)
    } else {
        throw new CustomError('UNKNOWN ERROR', `"${fetchName}" 에 대한 작업수행중 예기치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.`)
    }
}

const defaultFetchOptions = {
    credentials: 'same-origin',
    // headers : {
    //     'Authorization': 'Bearer ' + 'sdfsdfasdf'
    // }
    // 그냥하면 이거 헤더 뒤집어 씌워지거든 에디셔널 펫치옵션때문에
}

async function fetchCreator  (fetchUrl, additionalFetchOptions, fetchName){
    try{
        const fetchOptions = Object.assign({}, defaultFetchOptions, additionalFetchOptions)
        const response = await fetch(fetchUrl, fetchOptions)
        .then(data => fetchedDataMiddleware(data, fetchName).json())
        .then(json => JSON.parse(json))
        return response
    }
    catch(err){
        if(err instanceof CustomError){
            openPopupForFetchError(err.name, err.message)
        } else {
            console.log(err)
            openPopupForFetchError('UNKNOWN ERROR', '예기치 못한 오류가 발생했습니다. 나중에 다시 시도해주세요.')
        }
        return undefined
    }
}

export default fetchCreator