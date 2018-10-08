import React from 'react'
//styles
import classNames from 'classnames/bind'
import styles from './LargeSpinner.scss'
const cx = classNames.bind(styles)

const LargeSpinner = () => {
    return (
        <div className={cx('LargeSpinner')}>Loading...</div>
    )
}

export default LargeSpinner