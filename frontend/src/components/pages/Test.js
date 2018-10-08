import React, { Component } from 'react'
import draftToHtml from 'draftjs-to-html'

class Test extends Component {
    constructor(){
        super()
        this.state = {
            file : undefined
        }
    }

    _handleOnBtnFileClick = () => { this.refs.input.click() }
    _setFile = (file) => { this.setState(() => ({ file }))}

    _handleOnFileChange = () => {
        const file = this.refs.input.files[0]
        this._setFile(file)
    }

    _handleOnBtnSubmitClick = () => {
        const file = this.state.file
        this._sendImgFile(file)
    }

    _sendImgFile = (file) => {
        const formData = new FormData()
        formData.append('imgFile', file)
        fetch('/api/admin/postImgFileUpload',{
            method: 'post',
            body: formData
        })
    }

    async componentDidMount(){
        const response = await fetch('/api/admin/test', {
            method : "GET"
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        console.log(draftToHtml(response.post.contentState))
    }

    render() {

        const { _handleOnBtnFileClick, _handleOnFileChange, _handleOnBtnSubmitClick } = this

        return (
            <div>
                <input onChange={_handleOnFileChange} ref="input" style={{ display : 'none' }} type="file" accept="image/*"/>
                <button onClick={_handleOnBtnFileClick}>upload</button>
                <button onClick={_handleOnBtnSubmitClick}>submit</button>
            </div>
        )
    }
}

export default Test