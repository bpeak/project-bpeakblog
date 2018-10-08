import React from 'react'
//components
import AutoPopup from './AutoPopup/AutoPopup'
import AlertPopup from './AlertPopup/AlertPopup'
//local modules
import * as popupImgSrcs from './popupImgSrcs'

const Popup = (props) => {
    const { closePopup, popup } = props
    switch(props.type){
        case 'AUTO' :
        return (
            <AutoPopup
            imgSrc={popupImgSrcs[popup.imgName]}
            closePopup={closePopup}
            title={popup.title}
            description={popup.description}
            />
        )
        case 'ALERT' :
        return (
            <AlertPopup
            imgSrc={popupImgSrcs[popup.imgName]}
            closePopup={closePopup}
            title={popup.title}
            description={popup.description}
            />
        )
    }
}

export default Popup