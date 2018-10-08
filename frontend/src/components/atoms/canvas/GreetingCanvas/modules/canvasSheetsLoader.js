//spriteImgs
import lightImg from '~assets/ligth.png'
import castImg from '~assets/cast.png' 
import butterFlyImg from '~assets/butterFly.png'
//imgs
import mouseCursorImg from '~assets/mouseCursor.png'

import rock1Img from '~assets/rock1.png'
import rock2Img from '~assets/rock2.png'

const canvasSpriteSheetImgMaker = (src, displayW, displayH, columns, rows) => {
    return new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            img.displayW = displayW
            img.displayH = displayH
            img.columns = columns
            img.rows = rows
            img.onePeaceW = img.width / img.columns
            img.onePeaceH = img.height / img.rows
            resolve(img)
        }
        img.src = src
    })
}

const canvasSheetImgMaker = (src, displayW, displayH) => {
    return new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            img.displayW = displayW
            img.displayH = displayH
            resolve(img)
        }
        img.src = src
    })

}

const canvasSheetsLoader = async (themeName) => {
    if(themeName === 'space'){
        return ({
            spriteImgs : {
                mouseFollower : await canvasSpriteSheetImgMaker(castImg, 100, 100, 5, 4),
                ai : await canvasSpriteSheetImgMaker(butterFlyImg, 200, 200, 14, 6),

            },
            imgs : {
                mouseCursor : await canvasSheetImgMaker(mouseCursorImg, 100, 100)
            }
        })
    } else if(themeName === 'foggy'){
        return ({
            spriteImgs : {
                mouseFollower : await canvasSpriteSheetImgMaker(lightImg, 100, 100, 5, 5),
                ai : await canvasSpriteSheetImgMaker(rock2Img, 130, 130, 8, 8),
            },
            imgs : {
                mouseCursor : await canvasSheetImgMaker(mouseCursorImg, 100, 100)
            }
        })
    }
}

export default canvasSheetsLoader
