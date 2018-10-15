import React from 'react'
import { connect } from 'react-redux'
//actions
import * as popupsActionCreators from '~redux/popups/actionCreators'
import * as userActionCreators from '~redux/user/actionCreators'
//configs
import userConfig from '~configs/user.config.json'
//modules
import history from '~modules/history'
import fetchCreator from '~modules/fetchCreator'
import textValidator from '~modules/textValidator'
//components
import PreSocialLoginPage from '~components/pages/PreSocialLoginPage/PreSocialLoginPage'

const mapStateToProps = (state) => ({
    storeState : { urlHistory : state.urlHistory }
})

const mapDispatchToProps = (dispatch) => ({
    popupsActions : {
        openPopup : (payload) => dispatch(popupsActionCreators.openPopup(payload))
    },
    userActions : {
        loginSuccess : (payload) => dispatch(userActionCreators.loginSuccess(payload))
    }
})

class PreSocialLoginPageContainer extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            isLoadedPreUser : false,
            profileImgSrc : undefined,
            nick : {
                val : '',
                isFetching : false,
                isValidated : false,
                isTouched : false,
                errMsg : null
            },
            sex : {
                val : '',
            }
        }
    }

    _setIsLoadedPreUser = (isLoadedPreUser) => { this.setState(() => ({ isLoadedPreUser }))}
    _setProfileImgSrc = (profileImgSrc) => { this.setState(() => ({ profileImgSrc }))}
    _setInputVal = (inputName, val) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                val
            }
        }))
    }

    _setInputIsTouched = (inputName, isTouched) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                isTouched
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

    _setInputIsFetching = (inputName, isFetching) => {
        this.setState((state) => ({
            [inputName] : {
                ...state[inputName],
                isFetching
            }
        }))
    }

    _getPreUser = () => {
        return fetchCreator('/api/auth/social/preUser', {
            method : "GET"
        }, '소셜로그인 정보요청')
    }

    _doubleCheckNick = (nick) => {
        return fetchCreator('/api/auth/doubleCheckNick', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({ nick })
        }, '닉네임 중복검사')
    }

    handleOnNickChange = async (nick) => {
        const { 
            _setInputVal, 
            _setInputIsTouched, 
            _setInputErrMsg, 
            _setInputIsValidated 
        } = this
        _setInputVal('nick', nick)
        _setInputIsValidated('nick', false)
        _setInputIsTouched('nick', true)
        _setInputErrMsg('nick', null)

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

        const { 
            _setInputIsFetching, 
            _doubleCheckNick 
        } = this

        _setInputIsFetching('nick', true)
        const response = await _doubleCheckNick(nick)
        // fetch error
        if(!response) { return }

        if(response.isAvailable){
            _setInputIsValidated('nick', true)
        } else {
            _setInputErrMsg('nick', '사용중인 닉네임 입니다.')
            _setInputIsValidated('nick', false)
        }
        _setInputIsFetching('nick', false)
    }

    handleOnSexClick = (sex) => { this._setInputVal('sex', sex) }

    socialJoin = async () => {
        const nick = this.state.nick.val
        const response = await fetchCreator('/api/auth/social/join', {
            method : "POST",
            'content-type' : 'application/json',
            body : JSON.stringify({ nick })
        })
        if(!response) { return }
        if(!response.isSuccess){

        }

        const { 
            storeState,
            userActions, popupsActions
        } = this.props 
        const { user } = response
        userActions.loginSuccess({
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
    }

    async componentDidMount(){
        const response = await this._getPreUser()
        //fetch error
        if(!response){ return }

        const { preUser } = response
        if(!preUser){
            this.props.popupsActions.openPopup({
                popupType : "ALERT",
                imgName : 'warning',
                icon : '블라',
                title : '소셜로그인 에러',
                description : `소셜로그인 정보를 불러올수 없습니다.`
            })
            console.log('그다음 원래 들어온곳으로 리다이렉트 시켜야데는데')
        }
        if(preUser.isMember){         
            // direct login
            this.props.userActions.loginSuccess({
                unique_id : preUser.unique_id,
                isAdmin : preUser.isAdmin,
                nick : preUser.nick,
                profileImgSrc : preUser.profileImgSrc,
                token : preUser.token
            })
        } else {
            // join process
            this.handleOnNickChange(preUser.nick)
            this._setInputVal('sex', preUser.sex || '')
            this._setProfileImgSrc(preUser.profileImgSrc)
            this._setIsLoadedPreUser(true)
        }
    }

    render() {
        return (
            <PreSocialLoginPage
            isLoadedPreUser={this.state.isLoadedPreUser}
            nickState={this.state.nick}
            sexState={this.state.sex}
            profileImgSrc={this.state.profileImgSrc}

            handleOnSexClick={this.handleOnSexClick}
            handleOnNickChange={this.handleOnNickChange}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreSocialLoginPageContainer)