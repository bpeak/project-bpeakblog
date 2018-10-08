import React from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './SmallSpinner.scss'
const cx = classNames.bind(styles)

const SmallSpinner = () => {
    return (
        <div className={cx('SmallSpinner')}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default SmallSpinner