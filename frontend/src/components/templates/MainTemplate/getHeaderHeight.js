import * as deviceTypes from './deviceTypes'

const PC_HEADER_HEIGHT = 105
const TABLET_HEADER_HEIGHT = 100
const MOBILE_HEADER_HEIGHT = 95

const headerHeight = {
    [deviceTypes.PC] : PC_HEADER_HEIGHT,
    [deviceTypes.TABLET] : TABLET_HEADER_HEIGHT,
    [deviceTypes.MOBILE] : MOBILE_HEADER_HEIGHT
}

const getHeaderHeight = (deviceType) => {
    return headerHeight[deviceType]
}

export default getHeaderHeight