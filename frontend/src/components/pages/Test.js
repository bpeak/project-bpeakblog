import React, { Component } from 'react'
import draftToHtml from 'draftjs-to-html'
import fetchCreator from '~modules/fetchCreator'

const b =123
class Test extends React.PureComponent {
    constructor(){
        super()
        // const bb = new A()
        this.state = {
            file : 1
        }
    }

    _handleOnBtnClick = () => {
        console.log('클릭하빈다')
        if(Math.random() < 0.5){
            this.setState((state) => ({
                file : state.file + 1
            }))
        } else {
            this.setState((state) => ({
                file : state.file
            }))
        }

    }

    async componentDidMount(){
        console.log('실행안햐냐?')
        const response = fetchCreator('/api/auth/doubleCheckNick', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({nick : '123'})
        })
        console.log(response)
    }

    render() {

        console.log('렌더링됩니다')

        return (
            <div>
                <div>{this.state.file}</div>
                <button onClick={this._handleOnBtnClick}>버튼</button>
            </div>
        )
    }
}

export default Test