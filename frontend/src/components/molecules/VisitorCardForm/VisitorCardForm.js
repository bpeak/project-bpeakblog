import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//modules
import textValidator from '~modules/textValidator'
//configs
import * as visitorCardConfig from '~configs/visitorCard.config.json'
//components
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'
//styles
import classNames from 'classnames/bind'
import styles from './VisitorCardForm.scss'
const cx = classNames.bind(styles)

class VisitorCardForm extends Component {
    state = { 
        isOpend : false,
        nick : {
            val : '',
            errMsg : null
        },
        description : {
            val : '',
            errMsg : null
        },
    }

    _setIsOpend = (isOpend) => { this.setState(() => ({ isOpend }))}
    _setInputVal = (inputName, val) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                val
            }
        }))
    }
    _setInputErrMsg = (inputName, errMsg) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                errMsg
            }
        }))
    }
    _onChangeInputNick = (e) => {
        const nick = e.currentTarget.value
        this._setInputErrMsg('nick', null)
        this._setInputVal('nick', nick)
        if(!textValidator.validateBlank(nick)){
            return this._setInputErrMsg('nick', '닉네임에 공백을 포함할수 없습니다.')
        }
        if(!textValidator.validateMinLength(nick, visitorCardConfig.NICK_CHAR_MIN)){
            return this._setInputErrMsg('nick', `닉네임은 최소 ${visitorCardConfig.NICK_CHAR_MIN}자 부터 가능합니다.`)
        }
        if(!textValidator.validateMaxLength(nick, visitorCardConfig.NICK_CHAR_MAX)){
            return this._setInputErrMsg('nick', `닉네임은 최대 ${visitorCardConfig.NICK_CHAR_MAX}자 까지 가능합니다.`)
        }
    }
    _onChangeTextareaDescription = (e) => {
        const description = e.currentTarget.value
        this._setInputErrMsg('description', null)
        this._setInputVal('description', description)
        if(!textValidator.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)){
            return this._setInputErrMsg('description', `코멘트는 최대 ${visitorCardConfig.DESCRIPTION_CHAR_MAX}자 까지 가능합니다.`)
        }
    }
    _onClickBtnWrite = () => { this._setIsOpend(true) }
    _onClickBtnCancel = (e) => {
        e.preventDefault()
        this._setIsOpend(false)
    }
    _onClickBtnSubmit = (e) => {
        e.preventDefault()
        const nick = this.state.nick.val
        const description = this.state.description.val
        const comment = this.props.isLoggedIn 
        ?{
            description
        } 
        :{
            description,
            nick,
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
                    {!isLoggedIn && 
                    <Fragment>
                        <input maxLength={visitorCardConfig.NICK_CHAR_MAX} value={nick.val} onChange={_onChangeInputNick} placeholder="nick..."></input>
                        {nick.errMsg && <div className={cx('errMsg')}>{nick.errMsg}</div>}
                    </Fragment>}
                    <textarea maxLength={visitorCardConfig.DESCRIPTION_CHAR_MAX} value={description.val} onChange={_onChangeTextareaDescription} placeholder="comment..."></textarea>
                    {description.errMsg && <div className={cx('errMsg')}>{description.errMsg}</div>}
                    <div className={cx('btns')}>
                        <button 
                        onClick={_onClickBtnSubmit} 
                        disabled={
                            isLoggedIn 
                            ? 
                            ! description.val | description.errMsg
                            : !nick.val || nick.errMsg || !description || description.errMsg
                        } 
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