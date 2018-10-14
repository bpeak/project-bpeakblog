import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import JoinPage from '~components/pages/JoinPage/JoinPage'
//modules
import fetchCreator from '~modules/fetchCreator'
import history from '~modules/history'
import textValidator from '~modules/textValidator'
//actions
import * as userActionCreators from '~redux/user/actionCreators'
import * as popupActionCreators from '~redux/popups/actionCreators'
//configs
import userConfig from '~configs/user.config.json'

class JoinPageContainer extends Component {
    constructor(){
        super()
        this.state = {
            email : {
                val : '',
                isTouched : false,
                isFetching : false,
                isValidated : false,
                errMsg : null
            },
            nick : {
                val : '',
                isTouched : false,
                isFetching : false,
                isValidated : false,
                errMsg : null
            },
            password1 : {
                val : '',
                isTouched : false,
                isValidated : false,
                errMsg : null
            },
            password2 : {
                val : '',
                isTouched : false
            },
            sex : {
                val : '',
                isTouched : false
            },
            serverErrMsg : null
        }
    }

    _setInputVal = (inputName, val) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                val
            }
        }))
    }

    _setInputTouched = (inputName) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                isTouched : true
            }
        }))
    }

    _setInputIsFetching = (inputName, isFetching) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                isFetching
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

    _setInputIsValidated = (inputName, isValidated) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                isValidated
            }
        }))
    }

    _doubleCheckEmail = (email) => {
        const body = { email }
        return fetchCreator('/api/auth/local/doubleCheckEmail', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(body)
        })
    }

    _doubleCheckNick = (nick) => {
        const body = { nick }
        return fetchCreator('/api/auth/doubleCheckNick', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(body)
        })
    }

    validateEmail = async (email) => {
        try{
            const { _setInputVal, _setInputTouched, _setInputErrMsg, _setInputIsValidated } = this
            _setInputVal('email', email)
            if(this.state.email.isTouched === false){ _setInputTouched('email') }
            if(this.state.email.errMsg){ _setInputErrMsg('email', null) }
            if(email === ''){
                _setInputIsValidated('email', false)
                return _setInputErrMsg('email', '이메일은 필수 항목입니다.')
            }
            if(!textValidator.validateBlank(email)){
                _setInputIsValidated('email', false)
                return _setInputErrMsg('email', '이메일에 공백을 포함할수 없습니다.')
            }
            if(!textValidator.validateMaxLength(email, userConfig.EMAIL_CHAR_MAX)){
                _setInputIsValidated('email', false)
                return _setInputErrMsg('email', `이메일은 최대 ${userConfig.EMAIL_CHAR_MAX}자 까지 가능합니다.`)
            }

            const { _setInputIsFetching, _doubleCheckEmail } = this
            _setInputIsFetching('email', true)
            const response = await _doubleCheckEmail(email)
            if(response){
                if(response.isAvailable){
                    _setInputIsValidated('email', true)
                } else {
                    _setInputErrMsg('email', '사용중인 이메일 입니다.')
                    _setInputIsValidated('email', false)
                }
            }
            _setInputIsFetching('email', false)
        }
        catch(err){
            console.log(err)
        }
    }

    validateNick = async (nick) => {
        try{
            const { _setInputVal, _setInputTouched, _setInputErrMsg, _setInputIsValidated } = this
            _setInputVal('nick', nick)
            if(this.state.nick.isTouched === false){ _setInputTouched('nick') }
            if(this.state.nick.errMsg){ _setInputErrMsg('nick', null) }
            if(nick === ''){
                _setInputIsValidated('nick', false)
                return _setInputErrMsg('nick', '닉네임은 필수 항목입니다.')
            }
            if(!textValidator.validateBlank(nick)){
                _setInputIsValidated('nick', false)
                return _setInputErrMsg('nick', '닉네임에 공백을 포함할수 없습니다.')
            }
            if(!textValidator.validateMinLength(nick, userConfig.NICK_CHAR_MIN)){
                _setInputIsValidated('nick', false)
                return _setInputErrMsg('nick', `닉네임은 ${userConfig.NICK_CHAR_MIN}자 이상이어야 합니다.`)           
            }
            if(!textValidator.validateMaxLength(nick, userConfig.NICK_CHAR_MAX)){
                _setInputIsValidated('nick', false)
                return _setInputErrMsg('nick', `닉네임은 최대 ${userConfig.NICK_CHAR_MAX}자 까지 가능합니다.`)
            }

            const { _setInputIsFetching, _doubleCheckNick } = this
            _setInputIsFetching('nick', true)
            const response = await _doubleCheckNick(nick)
            if(response){
                if(response.isAvailable){
                    _setInputIsValidated('nick', true)
                } else {
                    _setInputErrMsg('nick', '사용중인 닉네임 입니다.')
                    _setInputIsValidated('nick', false)
                }
            }
            _setInputIsFetching('nick', false)
        }
        catch(err){
            console.log(err)
        }
    }

    _validatePassword = (password1, password2) => {
        const { _setInputErrMsg, _setInputIsValidated } = this
        if(password1 === '' || password2 === ''){
            _setInputIsValidated('password1', false)
            return _setInputErrMsg('password1', '비밀번호와 비밀번호확인을 입력해주세요.')
        }
        if(!textValidator.validateBlank(password1) || !textValidator.validateBlank(password2)){
            _setInputIsValidated('password1', false)
            return _setInputErrMsg('password1', '비밀번호에 공백을 포함할수 없습니다.')      
        }
        if(
            !textValidator.validateMinLength(password1, userConfig.PASSWORD_CHAR_MIN) || 
            !textValidator.validateMinLength(password2, userConfig.PASSWORD_CHAR_MIN)
        ){
            _setInputIsValidated('password1', false)
            return _setInputErrMsg('password1', `비밀번호는 ${userConfig.PASSWORD_CHAR_MIN}자 이상 이어야합니다.`)        
        }
        if(
            !textValidator.validateMaxLength(password1, userConfig.PASSWORD_CHAR_MAX) || 
            !textValidator.validateMaxLength(password2, userConfig.PASSWORD_CHAR_MAX)
        ){
            _setInputIsValidated('password1', false)
            return _setInputErrMsg('password1', `비밀번호는 최대 ${userConfig.PASSWORD_CHAR_MAX}자 까지 가능합니다.}`)        
        }
        if(password1 !== password2){
            _setInputIsValidated('password1', false)
            return _setInputErrMsg('password1', '비밀번호와 비밀번호 확인이 일치하지 않습니다.')           
        }

        _setInputErrMsg('password1', null)      
        _setInputIsValidated('password1', true)
    }

    changePassword1 = (password1) => {
        const { _setInputTouched, _setInputVal } = this
        _setInputVal('password1', password1)
        if(!this.state.password1.isTouched){ _setInputTouched('password1')}
        if(this.state.password1.isTouched && this.state.password2.isTouched){
            const { _validatePassword } = this
            _validatePassword(password1, this.state.password2.val)
        }
    }
    
    changePassword2 = (password2) => {
        const { _setInputTouched, _setInputVal } = this
        _setInputVal('password2', password2)
        if(!this.state.password2.isTouched){ _setInputTouched('password2')}
        if(this.state.password1.isTouched && this.state.password2.isTouched){
            const { _validatePassword } = this
            _validatePassword(this.state.password1.val, password2)
        }
    }

    clickSex = (sex) => {
        const { _setInputTouched, _setInputVal } = this
        _setInputTouched('sex', true)
        _setInputVal('sex', sex)
    }

    sendJoinForm = async () => {
        try{
            const email = this.state.email.val
            const nick = this.state.nick.val
            const password = this.state.password1.val
            const sex = this.state.sex.val
            const body = {
                email, nick, password, sex
            }
            const response = await fetchCreator('/api/auth/local/join', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            })

            if(!response) { return }
            if(response.isSuccess){
                const { user } = response
                const { 
                    storeState,
                    userActions, popupsActions, 
                } = this.props
                userActions.loginSuccess({
                    token : user.token,
                    isAdmin : user.isAdmin,
                    unique_id : user.unique_id,
                    nick : user.nick,
                    profileImgSrc : user.profileImgSrc
                })
                popupsActions.openPopup({
                    popupType : "AUTO",
                    icon : '블라',
                    title : 'JOIN SUCCESS',
                    description : `${user.nick}님 환영합니다.`,
                    imgName : 'clap'
                })                
                const redirectUrl = storeState.urlHistory.toAuthPageFrom || '/'
                history.push(redirectUrl)
            } else {
                console.log('실패')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    render() {
        return (
            <JoinPage
            validateEmail={this.validateEmail}
            validateNick={this.validateNick}
            changePassword1={this.changePassword1}
            changePassword2={this.changePassword2}
            clickSex={this.clickSex}
            status={this.state}
            sendJoinForm={this.sendJoinForm}
            />
        )
    }
}

const mapStateToProps = (storeState) => ({
    storeState : { urlHistory : { toAuthPageFrom : storeState.urlHistory.toAuthPageFrom } }
})
const mapDispatchToProps = (dispatch) => ({
    userActions : { loginSuccess : (payload) => dispatch(userActionCreators.loginSuccess(payload)) },
    popupsActions : { openPopup : (payload) => dispatch(popupActionCreators.openPopup(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinPageContainer)