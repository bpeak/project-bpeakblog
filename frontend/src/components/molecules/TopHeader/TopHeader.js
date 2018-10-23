import React from 'react'
import classNames from 'classnames/bind'
//styles
import styles from './TopHeader.scss'
const cx = classNames.bind(styles)

class TopHeader extends React.Component{
    constructor(props){
        super(props)
        const date = new Date()
        this.state = {
            time : {
                h : date.getHours(),
                m : date.getMinutes(),
                s : date.getSeconds()
            }
        }
    }

    _timerPeriod = 200

    _getFrontTimeLetter = (time) => {
        const timeLetter = String(time)
        return timeLetter.length === 1 ? 0 : timeLetter[0]
    }

    _getEndTimeLetter = (time) => {
        const timeLetter = String(time)
        return timeLetter.length === 1 ? timeLetter : timeLetter[1]
    }

    _setTime = (date) => {
        const nextTime = {
            h : date.getHours(),
            m : date.getMinutes(),
            s : date.getSeconds()
        }
        this.setState(() => ({ time : nextTime }))
    }

    componentDidMount(){
        const { _setTime, _timerPeriod } = this
        this.clockInterval = setInterval(() => {
            const date = new Date()
            _setTime(date)
        }, _timerPeriod)
    }

    componentWillUnmount(){
        const { clockInterval } = this
        clearInterval(clockInterval)
    }

    render() {
        const { time } = this.state
        const { _getFrontTimeLetter, _getEndTimeLetter } = this

        return (
            <div className={cx('TopHeader')}>
                <div className={cx('clock')}>
                    <div className={cx('bundle')}>
                        <span>{_getFrontTimeLetter(time.h)}</span>
                        <span>{_getEndTimeLetter(time.h)}</span>
                        h
                    </div>
                    <div className={cx('bundle')}>
                        <span>{_getFrontTimeLetter(time.m)}</span>
                        <span>{_getEndTimeLetter(time.m)}</span>
                        m
                    </div>
                    <div className={cx('bundle')}>
                        <span>{_getFrontTimeLetter(time.s)}</span>
                        <span>{_getEndTimeLetter(time.s)}</span>
                        s
                    </div>
                </div>
            </div>
        )
    }
}

export default TopHeader