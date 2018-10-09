import React, { Component } from 'react'
import draftToHtml from 'draftjs-to-html'

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

    componentDidMount(){

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

function A(){
    this.a = 1
}

function B(){
    this.a = 1
}