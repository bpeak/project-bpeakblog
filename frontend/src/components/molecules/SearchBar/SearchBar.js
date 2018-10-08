import React, { Component } from 'react'
//modules
import history from '~modules/history'
//imgs
import searchImgSrc from '~assets/search.png'
//styles
import classNames from 'classnames/bind'
import styles from './SearchBar.scss'
const cx = classNames.bind(styles)

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchVal : '',
            isFocused : false
        }
    }

    _ENTER_KEYCODE = 13

    _setIsFocused = (isFocused) => { this.setState(() => ({ isFocused }))}
    _setSearchVal = (searchVal) => { this.setState(() => ({ searchVal }))}

    _handleOnCoverClick = () => {
        this.refs.input.focus()
        this._setIsFocused(true)
    }

    _handleOnInputBlur = (e) => {
        const searchVal = e.currentTarget.value
        this.setState(() => ({}))
        this._setSearchVal(searchVal)
        this._setIsFocused(false)
    }

    _handleOnInputKeyDown = (e) => {
        if(e.keyCode !== this._ENTER_KEYCODE){ return }
        const searchVal = e.currentTarget.value
        history.push(`/posts/search?keyword=${searchVal}`)
        this._setSearchVal(searchVal)
        this._setIsFocused(false)
    }
    
    render() {

        const { _handleOnCoverClick } = this
        const { searchVal } = this.state

        return (
            <div className={cx('SearchBar')}>
                {!this.state.isFocused 
                && <div onClick={_handleOnCoverClick} className={cx('cover')}>
                    <img src={searchImgSrc}/>
                    <span>{searchVal || "검색"}</span>   
                </div>}
                <input onKeyDown={this._handleOnInputKeyDown} onBlur={this._handleOnInputBlur} ref="input" type="text"/>
            </div>
        )
    }
}

export default SearchBar