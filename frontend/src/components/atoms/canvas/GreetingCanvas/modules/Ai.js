import MouseFollower from './MouseFollower'

const defaultDirectionX = 0.5
const defaultDirectionY = 0.8660254037844386
const defaultSpeed = 3

export default class Ai extends MouseFollower{
    constructor(x, y){
        super(x, y)
        this.directionX = defaultDirectionX
        this.directionY = defaultDirectionY
        this.speed = defaultSpeed
    }
}