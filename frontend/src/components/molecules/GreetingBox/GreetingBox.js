import React, { Component } from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './GreetingBox.scss'
const cx = classNames.bind(styles)
//components
import GreetingCanvas from '~components/atoms/canvas/GreetingCanvas/GreetingCanvas'
//modules
import imgLoader from '~modules/imgLoader'
//local modules
import GreetingBoxTheme from './GreetingBoxTheme'
const greetingBoxTheme = new GreetingBoxTheme()

class GreetingBox extends Component {
    constructor(){
        super()
        this.state = {
            boxHeight : undefined,
            imgRatio : undefined,
        }
    }

    _handleOnBtnShowContentsClick = () => {
        const box = this.refs.box
        const boxRect = box.getBoundingClientRect()

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const headerHeight = Math.abs(Math.abs(scrollTop) - Math.abs(boxRect.top))
        const canvasRemainHeight = boxRect.height - scrollTop

        console.log(headerHeight, '헤더헤이트')
        console.log(boxRect.height, '박스높이')
        console.log(boxRect.top, '박스탑')

        console.log('낙은 박스 높이 : ', boxRect.height + boxRect.top)

        window.scrollBy(0, boxRect.top + boxRect.height)

        // window.scrollBy(0, boxRect.height + boxRect.top - headerHeight)

        // window.scrollTo(0, headerHeight + boxRect.height)

        const h = boxRect.height
        const y = window.scrollY
        // console.log(boxRect)
    
        // const rect = greetingBox.getBoundingClientRect()
        // const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        // // console.log(`rect.top : ${rect.top} scrollTop : ${scrollTop}`)
        // const headerHeight = Math.abs(Math.abs(scrollTop) - Math.abs(rect.top))
        // const canvasRemainHeight = rect.height - scrollTop

        // const ddr = headerHeight + rect.height

        // scrollBy(0, canvasRemainHeight)
        // animateScrollBy(0, canvasRemainHeight, 1000)
    }

    _setBoxHeight = (boxHeight) => { this.setState(() => ({ boxHeight })) }
    _setImgRatio = (imgRatio) => { this.setState(() => ({ imgRatio })) }

    _handleOnResize = () => {
        if(!this.state.imgRatio){ return }
        const box = this.refs.box
        const rect = box.getBoundingClientRect()
        const boxWidth = rect.width
        const boxHeight = boxWidth * this.state.imgRatio
        this._setBoxHeight(boxHeight)
    }

    async componentDidMount(){
        const img = await imgLoader(greetingBoxTheme.imgSrc)
        const imgRatio = img.height / img.width
        const boxWidth = window.innerWidth
        const boxHeight = boxWidth * imgRatio
        this._setImgRatio(imgRatio)
        this._setBoxHeight(boxHeight)
        window.addEventListener('resize', this._handleOnResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._handleOnResize)
    }

    render() {

        const { boxHeight, imgRatio } = this.state
        const { _handleOnBtnShowContentsClick } = this
        const greetingBoxStyle = boxHeight ? {
            backgroundImage: `url(${greetingBoxTheme.imgSrc})`,
            height : boxHeight
        } : {
            height : '1px'
        }

        return (
            <div ref="box" style={greetingBoxStyle} className={cx('GreetingBox')}>
                {imgRatio && <div className={cx('GreetingCanvas-container')}>
                    <GreetingCanvas
                    themeName={greetingBoxTheme.name}
                    imgRatio={imgRatio}
                    />
                </div>}
                <div className={cx('contents')}>
                    <h2>
                        {"LET'S DEVELOP ME \n TO BE A BETTER DEVELOPER".split('\n').map((line, index) => {
                        return <div key={index}>{line}</div>})}
                    </h2>
                    <h3>개발 블로그 입니다.</h3>
                    <div className={cx('btn-container')}>
                        <button onClick={_handleOnBtnShowContentsClick} className={cx('btnShowContents')}>SHOW CONTENTS</button>
                        <button className={cx('btnContactMe')}>개발스택</button>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default GreetingBox