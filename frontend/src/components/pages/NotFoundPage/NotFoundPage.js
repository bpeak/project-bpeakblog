import React from 'react'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
//styles
import classNames from 'classnames/bind'
import styles from './NotFoundPage.scss'
const cx = classNames.bind(styles)
//imgs
import oops1ImgSrc from '~assets/oops1.jpg'
import oops2ImgSrc from '~assets/oops2.jpg'

const NotFoundPage = () => {

    const oopsImgSrcs = [oops1ImgSrc, oops2ImgSrc]
    const randomIndex = Math.floor(Math.random() * oopsImgSrcs.length)
    const oopsImgSrc = oopsImgSrcs[randomIndex]

    return (
        <MainTemplate title="Not Found">
            <div 
            style={{
                backgroundImage : `url(${oopsImgSrc})`,
                backgroundSize: 'cover'
            }}
            className={cx('NotFoundPage')}>
                <h2>404</h2>
                <div>페이지를 찾을수 없습니다.</div>
            </div>
        </MainTemplate>
    )
}

export default NotFoundPage