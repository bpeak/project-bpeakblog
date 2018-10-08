import React from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './HomePage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import GreetingBox from '~components/molecules/GreetingBox/GreetingBox'

const HomePage = (props) => {
    return (
        <MainTemplate title={'홈데스네'}>
            <div className={cx('HomePage')}>
                <GreetingBox/>
                <div></div>
                <div></div>
            </div>
        </MainTemplate>
    )
}



export default HomePage