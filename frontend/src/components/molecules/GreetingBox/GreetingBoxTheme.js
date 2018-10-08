import foggyImgSrc from '~assets/foggy.jpg'
import spaceImgSrc from '~assets/space.jpg'

const themes = [
    {
        name : 'foggy',
        imgSrc : foggyImgSrc
    },
    {
        name : 'space',
        imgSrc : spaceImgSrc
    }
]

export default class GreetingBoxTheme{
    constructor(){
        const randomIndex = Math.floor( Math.random() * themes.length )
        const theme = themes[randomIndex]
        this.name = theme.name
        this.imgSrc = theme.imgSrc
    }
}