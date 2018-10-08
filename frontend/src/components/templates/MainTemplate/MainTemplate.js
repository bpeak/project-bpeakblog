import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet'
//styles
import styles from './style.scss'
const cx = classNames.bind(styles)
//components
import TopHeader from '~components/molecules/TopHeader/TopHeader'
import MainHeaderContainer from '~containers/MainHeaderContainer'
import Footer from '~components/molecules/Footer/Footer'
//local modules
import getDeviceType from './getDeviceType'
import getHeaderHeight from './getHeaderHeight'
import mainTemplateStyleMaker from './mainTemplateStyleMaker'

class MainTemplate extends Component{
    constructor(props){
        super(props)
        const deviceType = getDeviceType(window.innerWidth)
        const topHeaderHeight = getHeaderHeight(deviceType) / 2
        const scrollY = window.scrollY
        const isTopHeaderVisible = (topHeaderHeight >= scrollY)
        this.state = {
            isTopHeaderVisible,
            deviceType
        }
    }

    _setDeviceType = (deviceType) => { this.setState(() =>  ({ deviceType }))}
    _setIsTopHeaderVisible = (isTopHeaderVisible) => { this.setState(() => ({ isTopHeaderVisible }))}

    _handleOnScroll = () => {
        const { deviceType } = this.state
        const topHeaderHeight = getHeaderHeight(deviceType) / 2
        const prevIsTopHeaderVisible = this.state.isTopHeaderVisible
        const nextIsTopHeaderVisible = (topHeaderHeight >= window.scrollY)

        if(prevIsTopHeaderVisible !== nextIsTopHeaderVisible){
            const { _setIsTopHeaderVisible } = this
            _setIsTopHeaderVisible(nextIsTopHeaderVisible)
        }
    }

    _handleOnResize = () => {
        const innerWidth = window.innerWidth
        const prevDeviceType = this.state.deviceType
        const nextDeviceType = getDeviceType(innerWidth)
        if(prevDeviceType !== nextDeviceType){
            const { _setDeviceType } = this
            _setDeviceType(nextDeviceType)
        }
    }

    componentDidMount(){
        const { _handleOnScroll, _handleOnResize } = this
        window.addEventListener('scroll', _handleOnScroll)
        window.addEventListener('resize', _handleOnResize)
    }

    componentWillUnmount(){
        const { _handleOnScroll, _handleOnResize } = this
        window.removeEventListener('scroll', _handleOnScroll)
        window.removeEventListener('resize', _handleOnResize)
    }
    
    render(){
        const { children, title } = this.props
        const { isTopHeaderVisible, deviceType } = this.state
        const style = mainTemplateStyleMaker(deviceType, isTopHeaderVisible)

        return(
            <Fragment>
                <Helmet>
                    <title>{title ? `BPEAK BLOG - ${title}` : 'BPEAK BLOG'}</title>
                </Helmet>
                <div className={cx('MainTemplate')}>
                    <header className={cx('header')}>
                        <div style={style["TopHeader-container"]} className={cx('TopHeader-container')}><TopHeader/></div>
                        <div style={style["MainHeader-container"]} className={cx('MainHeader-container')}><MainHeaderContainer/></div>
                    </header>
                    <div style={style['contents']} className={cx('contents')}>
                        {children}
                    </div>
                    <footer style={style['footer']} className={cx('footer')}>
                        <Footer/>
                    </footer>
                </div>
            </Fragment>          
        )
    }
}

MainTemplate.propTypes = {
    title : PropTypes.string,
    children : PropTypes.element.isRequired
}

export default MainTemplate