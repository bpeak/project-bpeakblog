import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//components
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './VisitorCardForm.scss'
const cx = classNames.bind(styles)

class VisitorCardForm extends Component {
    state = { 
        isOpend : false,
        nick : '',
        description : ''
    }

    _setIsOpend = (isOpend) => { this.setState(() => ({ isOpend }))}
    _setIsFetching = (isFetching) => { this.setState(() => ({ isFetching }))}
    _setNick = (nick) => { this.setState(() => ({ nick }))}
    _setDescription = (description) => { this.setState(() => ({ description }))}
    _onChangeInputNick = (e) => {
        const nick = e.currentTarget.value
        this._setNick(nick)
    }
    _onChangeTextareaDescription = (e) => {
        const description = e.currentTarget.value
        this._setDescription(description)
    }
    _onClickBtnWrite = () => { this._setIsOpend(true) }
    _onClickBtnCancel = (e) => {
        e.preventDefault()
        this._setIsOpend(false)
    }
    _onClickBtnSubmit = (e) => {
        e.preventDefault()
        const comment = this.props.isLoggedIn ? {
            description : this.state.description
        } : {
            description : this.state.description,
            nick : this.state.nick
        }
        this.props.handleNewVisitorCard(comment)
        this._setIsOpend(false)
    }

    render() {
        const {
            isOpend, 
            nick, 
            description 
        } = this.state
        const {
            isLoggedIn,
            isFetching
        } = this.props
        const { 
            _onChangeInputNick,
            _onChangeTextareaDescription,
            _onClickBtnWrite,
            _onClickBtnCancel,
            _onClickBtnSubmit
        } = this

        return (
            <div className={cx('VisitorCardForm')}>
                {isFetching && <div className={cx('spinner-container')}><SmallSpinner/></div>}
                {!isOpend ? <button className={cx('write')} onClick={_onClickBtnWrite}>방명록쓰기</button>
                :<Fragment>
                <form className={cx('form')}>
                    <h2>Visitor card</h2>
                    {!isLoggedIn && <input value={nick} onChange={_onChangeInputNick} placeholder="nick..."></input>}
                    <textarea value={description} onChange={_onChangeTextareaDescription} placeholder="comment..."></textarea>
                    <div className={cx('btns')}>
                        <button 
                        onClick={_onClickBtnSubmit} 
                        disabled={isLoggedIn ? !description : !nick || !description} 
                        className={cx('submit')}>
                        등록
                        </button>
                        <button className={cx('cancel')} onClick={_onClickBtnCancel}>취소</button>
                    </div>
                </form>
                </Fragment>}
            </div>
        )
    }
}

VisitorCardForm.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default VisitorCardForm