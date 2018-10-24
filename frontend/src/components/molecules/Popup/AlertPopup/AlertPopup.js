import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
//styles
import styles from './AlertPopup.scss'
const cx = classNames.bind(styles)

const popupRoot = document.getElementById('popup-root')

class AlertPopup extends React.Component {

    _disableScroll = () => {
        document.body.style.overflow = 'hidden'
    }
    _ableScroll = () => {
        document.body.removeAttribute('style')
    }

    _handleOnBtnOkClick = () => {
        const { _ableScroll } = this
        const { closePopup } = this.props
        _ableScroll()
        closePopup()
    }

    componentDidMount(){
        const { _disableScroll } = this
        _disableScroll()
    }

    render(){

        const { _handleOnBtnOkClick } = this
        const { 
            title, 
            description,
            imgSrc,
        } = this.props

        return ReactDOM.createPortal(
            <div className={cx('AlertPopup-wrapper')}>
                <div className={cx('AlertPopup')}>
                    <div className={cx('img-container')}><img src={imgSrc}/></div>
                    <div className={cx('mainMsg')}>{title}</div>
                    <div className={cx('subMsg')}>{description}</div>
                    <div className={cx('btn-container')}>
                        <button className={cx('btnOk')} onClick={_handleOnBtnOkClick}>OK</button>
                    </div>
                </div>
            </div>,
            popupRoot
        )
    }
}

AlertPopup.propTypes = {
    // icon : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    closePopup : PropTypes.func.isRequired
}

export default AlertPopup