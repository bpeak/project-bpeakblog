import React, { Component } from 'react'
import draftToHtml from 'draftjs-to-html'
import fetchCreator from '~modules/fetchCreator'

const b =123
class Test extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            val : ''
        }
    }

    onChange = (e) => {
        const val = e.currentTarget.value
        this.setState({
            val : val
        })
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.val}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default Test