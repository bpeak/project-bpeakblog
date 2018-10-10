import * as deviceTypes from './deviceTypes'

const TABLET_MAX_WIDTH = 960
const MOBILE_MAX_WIDTH = 600

const getDeviceType = (innerWidth) => {
    if(innerWidth > TABLET_MAX_WIDTH){
        return deviceTypes.PC
    } else if(innerWidth > MOBILE_MAX_WIDTH){
        return deviceTypes.TABLET
    } else {
        return deviceTypes.MOBILE
    }
}

export default getDeviceType