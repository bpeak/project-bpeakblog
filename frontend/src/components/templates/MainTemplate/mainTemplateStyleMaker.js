import getHeaderHeight from './getHeaderHeight'
import getFooterHeight from './getFooterHeight'

const MainTemplateStyleMaker = (deviceType, isTopHeaderVisible) => {
    const headerHeight = getHeaderHeight(deviceType)
    const footerHeight = getFooterHeight(deviceType)
    return {
        'TopHeader-container' : {
            height : headerHeight / 2
        },
        'MainHeader-container' : {
            width : '100%',
            height : headerHeight / 2,
            position : isTopHeaderVisible ? 'relative' : 'fixed',
            top : 0
        },
        'contents' : {
            paddingTop : isTopHeaderVisible ? 0 : headerHeight / 2,
            paddingBottom : footerHeight
        },
        'footer' : {
            width : '100%',
            height : footerHeight,
            position : 'absolute',
            bottom : 0,
        },
        'title' : {
            height : headerHeight / 2 * 0.9
        }
    }
}

export default MainTemplateStyleMaker