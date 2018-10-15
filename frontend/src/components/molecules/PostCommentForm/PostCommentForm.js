import React from 'react'
import PropTypes from 'prop-types'
//configs
import commentConfig from '~configs/comment.config.json'
//styles
import classNames from 'classnames/bind'
import styles from './PostCommentForm.scss'
const cx = classNames.bind(styles)

class PostCommentForm extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            isOpend : false,
            description : '',
            password : ''
        }
    }

    _setIsOpend = (isOpend) => { this.setState(() => ({ isOpend })) }
    _setDescription = (description) => { this.setState(() => ({ description }))}
    _setPassword = (password) => { this.setState(() => ({ password }))}
    _handleOnTextareaChange = (e) => {
        const description = e.currentTarget.value
        this._setDescription(description)

        const prevIsOpend = this.state.isOpend
        const nextIsOpend = description !== ''
        if(prevIsOpend !== nextIsOpend){ this._setIsOpend(nextIsOpend) }
    }
    _handleOnPasswordChange = (e) => {
        const password = e.currentTarget.value
        this._setPassword(password)
    }

    _resetTextareaValue = () => {
        this.refs.textarea.value = ""
    }

    _handleOnBtnSubmitClick = (e) => {
        e.preventDefault()
        console.log('보낼그야')
        const description = this.state.description
        const password = this.state.password
        this.props.handleNewComment({
            description,
            password
        })
    }

    render() {
        const { 
            isOpend,
            description,
            password
        } = this.state
        const { isLoggedIn } = this.props
        const { 
            _handleOnTextareaChange, 
            _handleOnPasswordChange,
            _handleOnBtnSubmitClick
        } = this

        return (
            <form className={cx('PostCommentsForm')}>
                {isOpend && !isLoggedIn 
                && <div className={cx('anonymousNotifier')}>로그인이 되어있지 않아 익명으로 작성됩니다.</div>
                }
                <textarea
                className={cx('description')} 
                maxLength={commentConfig.DESCRIPTION_CHAR_MAX}
                onChange={_handleOnTextareaChange} 
                placeholder="comment...">
                </textarea>
                {isOpend && !isLoggedIn 
                && <input
                className={cx('password')}
                onChange={_handleOnPasswordChange}
                minLength={commentConfig.PASSWORD_CHAR_MIN}
                maxLength={commentConfig.PASSWORD_CHAR_MAX}
                type="password" 
                placeholder="비밀번호를 입력해주세요. ( 삭제, 수정시에 사용됩니다. )">
                </input>
                }
                {isOpend 
                && <button 
                className={cx('submit')} 
                disabled={isLoggedIn ? !description : !description || !password }
                onClick={_handleOnBtnSubmitClick}>
                SUBMIT
                </button>
                }
            </form>
        )
    }
}

PostCommentForm.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired,
    handleNewComment : PropTypes.func.isRequired
}

export default PostCommentForm