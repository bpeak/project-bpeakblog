import React, { Component } from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './style.scss'
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
                        {"LET'S DEVELOPME \n TO BE A BETTER DEVELOPER".split('\n').map((line, index) => {
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