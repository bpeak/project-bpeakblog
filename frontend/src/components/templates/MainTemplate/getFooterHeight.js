import * as deviceTypes from './deviceTypes'

const PC_FOOTER_HEIGHT = 100
const TABLET_FOOTER_HEIGHT = 80
const MOBILE_FOOTER_HEIGHT = 70

const footerHeight = {
    [deviceTypes.PC] : PC_FOOTER_HEIGHT,
    [deviceTypes.TABLET] : TABLET_FOOTER_HEIGHT,
    [deviceTypes.MOBILE] : MOBILE_FOOTER_HEIGHT
}

const getFooterHeight = (deviceType) => {
    return footerHeight[deviceType]
}

export default getFooterHeight