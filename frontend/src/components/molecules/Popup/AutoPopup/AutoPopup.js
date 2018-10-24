import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
//styles
import styles from './AutoPopup.scss'
const cx = classNames.bind(styles)

const popupRoot = document.getElementById('popup-root')
class AutoPopup extends React.Component{
    constructor(){
        super()
        this.state = {
            willDisappear : false
        }
    }

    //css animationDuration : 0.5s (500)
    animationDuration = 500
    visibleTime = 3000
    
    _disappearer = (animationDuration, visibleTime) => {
        return new Promise(resolve => {
            setTimeout(() => {
                this.setState({ willDisappear : true }, () => resolve())
            }, animationDuration + visibleTime)
        })
    }

    async componentDidMount(){
        const { _disappearer } = this
        const { animationDuration, visibleTime } = this
        await _disappearer(animationDuration, visibleTime)
        setTimeout(() => {
            console.log('먼데이거왜 실행 안되는데?')
            this.props.closePopup()
        }, animationDuration + visibleTime)
    }

    render(){

        const { 
            title, 
            description,
            imgSrc
        } = this.props

        const { willDisappear } = this.state

        return ReactDOM.createPortal(
                <div className={cx('AutoPopup-wrapper')}>
                    <div className={cx('AutoPopup', { willDisappear })}>
                        <div className={cx('img-container')}><img src={imgSrc}/></div>
                        <div className={cx('mainMsg')}>{title}</div>
                        <div className={cx('subMsg')}>{description}</div>
                    </div>
                </div>,
            popupRoot
        )
    }
}

AutoPopup.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    closePopup : PropTypes.func.isRequired
}

export default AutoPopup