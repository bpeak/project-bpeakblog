import React, { Component } from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './style.scss'
const cx = classNames.bind(styles)
//local modules
import DrawingCanvas from './modules/DrawingCanvas'
import getCanvasMousePosition from './modules/getCanvasMousePosition'
import canvasSheetsLoader from './modules/canvasSheetsLoader'
import MouseFollower from './modules/MouseFollower'
import Ai from './modules/Ai'
import aiHelper from './modules/aiHelper'
//local configs
import canvasConfig from './configs/canvas.config.json'

const defaultMouseStatus = {
    x : undefined,
    y : undefined,
    isEnterd : false
}

class GreetingCanvas extends Component {
    constructor(){
        super()
        this.mouse = defaultMouseStatus
    

        this.mouseFollowers = []
        this.mouseFollowerSystem = {
            frameCounter : 0,
            watchSwitch : 1,
            creationSwitch : 0
        }

        this.ai = new Ai(1000, 800)
        this.aiSystem = {
            frameCounter : 0
        }
    }

    shouldComponentUpdate = () => {
        return false
    }

    _mouseFollowerSwitcher = () => {
        if(this.mouseFollowerSystem.watchSwitch === 1){
            this.mouseFollowerSystem.creationSwitch = 1
            this.mouseFollowerSystem.watchSwitch = 0
            setTimeout(() => {
                this.mouseFollowerSystem.watchSwitch = 1
            }, 60)
        }
    }

    _handleOnMouseLeave = (e) => { this.mouse = defaultMouseStatus }

    _handleOnMouseWheel = (e) => {
        const { mainCanvas } = this.refs
        const mousePosition = getCanvasMousePosition(mainCanvas, e)
        this.mouse = {
            x : mousePosition.x,
            y : mousePosition.y,
            isEntered : true
        }
        this._mouseFollowerSwitcher()
    }

    _handleOnMouseMove = (e) => {
        const { mainCanvas } = this.refs
        const mousePosition = getCanvasMousePosition(mainCanvas, e)
        this.mouse = {
            x : mousePosition.x,
            y : mousePosition.y,
            isEntered : true
        }
        this._mouseFollowerSwitcher()
    }

    _handleOnMouseEnter = (e) => {
        const { mainCanvas } = this.refs
        const mousePosition = getCanvasMousePosition(mainCanvas, e)
        this.mouse = {
            x : mousePosition.x,
            y : mousePosition.y,
            isEntered : true
        }
    }

    async componentDidMount(){
        const { themeName } = this.props
        // const themeName = 'space'
        const canvasSheets = await canvasSheetsLoader(themeName)

        const mouseFollowerImg = canvasSheets.spriteImgs.mouseFollower
        const aiImg = canvasSheets.spriteImgs.ai
        const mouseCursorImg = canvasSheets.imgs.mouseCursor
        
        const { mainCanvas } = this.refs
        const canvas = {}
        canvas.main = new DrawingCanvas(mainCanvas)
        canvas.buffer = new DrawingCanvas(document.createElement('canvas'), canvas.main.c.width, canvas.main.c.height)

        const mouseFollowerFrameIndexIncreser = (mouseFollower) => {
            mouseFollower.currentFrameIndexC += 1
            if(mouseFollower.currentFrameIndexC === mouseFollowerImg.columns){
                mouseFollower.currentFrameIndexC = 0
                mouseFollower.currentFrameIndexR += 1
            }
            return mouseFollower
        }

        const mouseFollowerDestroyer = (mouseFollower) => {
            if(mouseFollower.currentFrameIndexR === mouseFollowerImg.rows){
                return undefined
            } else {
                return mouseFollower
            }
        }

        const update = () => {
            const { mouse, mouseFollowerSystem, ai } = this

            //mouse Follower
            // 생성
            if(mouseFollowerSystem.creationSwitch === 1){
                this.mouseFollowers.push(new MouseFollower(mouse.x, mouse.y))
                this.mouseFollowerSystem.creationSwitch = 0
            } 

            // 업데이트
            this.mouseFollowerSystem.frameCounter += 1
            if(this.mouseFollowerSystem.frameCounter === 5){
                this.mouseFollowerSystem.frameCounter = 0
                this.mouseFollowers = this.mouseFollowers.map((mouseFollower) => {
                    if(mouseFollower !== undefined){
                        mouseFollower = mouseFollowerFrameIndexIncreser(mouseFollower)
                        mouseFollower = mouseFollowerDestroyer(mouseFollower)
                        return mouseFollower
                    }
                })
            }

            //ai
            this.aiSystem.frameCounter += 1
            if(this.aiSystem.frameCounter === 4){
                this.aiSystem.frameCounter = 0
                this.ai.currentFrameIndexC += 1
                if(this.ai.currentFrameIndexC === aiImg.columns){
                    this.ai.currentFrameIndexC = 0
                    this.ai.currentFrameIndexR += 1
                    if(this.ai.currentFrameIndexR === aiImg.rows){
                        this.ai.currentFrameIndexR = 0
                    }
                }
            }
            
            const updatedAi = (function(){
                let updatedAi = {...ai}
                updatedAi = aiHelper.update.direction(updatedAi, mouse)
                updatedAi = aiHelper.update.speed(updatedAi, mouse)
                updatedAi = aiHelper.update.position(updatedAi)
                return updatedAi
            })(ai, mouse)

            //보정
            if(updatedAi.x - this.mouse.x < 10){
                updatedAi.directionX = 0
            }
            
            if(updatedAi.x <= 0 || updatedAi.x >= canvas.main.c.width){
                updatedAi.directionX = -updatedAi.directionX
            }

            if(updatedAi.y <= 0 || updatedAi.y >= canvas.main.c.height){
                updatedAi.directionY = -updatedAi.directionY
            }

            this.ai = updatedAi       

        }

        const initCanvas = (canvasName) => {
            canvas[canvasName].ctx.clearRect(0, 0, canvas.main.c.width, canvas.main.c.height)
        }

        const drawBuffer = (ctx) => {
            const { mouse, mouseFollowers, ai } = this
            // mouse Followers 
            for(let i = 0; i < mouseFollowers.length; i++){
                if(mouseFollowers[i] !== undefined){
                    ctx.drawImage(
                        mouseFollowerImg, 
                        mouseFollowerImg.onePeaceW * mouseFollowers[i].currentFrameIndexC, 
                        mouseFollowerImg.onePeaceH * mouseFollowers[i].currentFrameIndexR, 
                        mouseFollowerImg.onePeaceW,
                        mouseFollowerImg.onePeaceH,
                        mouseFollowers[i].x - mouseFollowerImg.displayW / 2,
                        mouseFollowers[i].y - mouseFollowerImg.displayH / 2,
                        mouseFollowerImg.displayW,
                        mouseFollowerImg.displayH
                    )
                }
            }

            // mouse cursor
            if(mouse.isEntered === true){
                ctx.drawImage(
                    mouseCursorImg,
                    mouse.x - 31, 
                    mouse.y - 20, 
                    mouseCursorImg.displayW, 
                    mouseCursorImg.displayH
                )
            }

            // ai
            if(ai.directionX >= 0){
                ctx.drawImage(
                    aiImg, 
                    aiImg.onePeaceW * ai.currentFrameIndexC, 
                    aiImg.onePeaceH * ai.currentFrameIndexR, 
                    aiImg.onePeaceW,
                    aiImg.onePeaceH,
                    ai.x - aiImg.displayW / 2,
                    ai.y - aiImg.displayH / 2,
                    aiImg.displayW,
                    aiImg.displayH
                )
            } else {
                ctx.save()
                ctx.translate(ai.x + aiImg.displayW/2, ai.y - aiImg.displayH/2)
                ctx.scale(-1,1)
                ctx.drawImage(
                    aiImg, 
                    aiImg.onePeaceW * ai.currentFrameIndexC, 
                    aiImg.onePeaceH * ai.currentFrameIndexR, 
                    aiImg.onePeaceW,
                    aiImg.onePeaceH,
                    0,
                    0,
                    aiImg.displayW,
                    aiImg.displayH
                )
                ctx.restore()
            }

            //rock 
            // ctx.drawImage(rock1Img, 300, 300, 300, 300)
        }

        const drawMain = (ctx) => {
            ctx.drawImage(canvas.buffer.c, 0, 0, canvas.main.c.width, canvas.main.c.height)
        }

        const draw = () => {
            initCanvas('buffer')
            initCanvas('main')
            drawBuffer(canvas.buffer.ctx)
            drawMain(canvas.main.ctx)
        }

        let id

        const loop = () => {
            update()
            draw()
            id = requestAnimationFrame(loop)
        }   

        loop()

        this.cancelLoop = () => {
            cancelAnimationFrame(id)
        }
    }

    componentWillUnmount(){
        this.cancelLoop()
    }

    render() {

        const { imgRatio } = this.props
        const width = canvasConfig.width
        const height = width * imgRatio

        const { 
            _handleOnMouseEnter, 
            _handleOnMouseLeave, 
            _handleOnMouseMove, 
            _handleOnMouseWheel 
        } = this

        return (
            <canvas
            ref="mainCanvas" 
            className={cx('GreetingCanvas')}
            width={width}
            height={height}
            onMouseEnter={_handleOnMouseEnter}
            onMouseLeave={_handleOnMouseLeave}
            onMouseMove={_handleOnMouseMove}
            onWheel={_handleOnMouseWheel}
            >
            </canvas>
        )
    }
}

export default GreetingCanvas