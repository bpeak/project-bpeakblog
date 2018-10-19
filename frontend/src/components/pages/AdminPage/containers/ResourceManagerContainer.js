import React, { Component } from 'react'
import { connect } from 'react-redux'
//components
import ResourceManager from '../components/molecules/ResourceManager/ResourceManager'

const mapStateToProps = (state) => ({
    userState : state.user
})

class ResourceManagerContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts : undefined
        }
    }

    _getPosts = () => {
        const token = this.props.userState.token
        return fetch('/api/admin/posts', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
            }
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
    }

    async componentDidMount(){
        const response = await this._getPosts()
        console.log(response)
    }

    render() {
        return (
            <ResourceManager/>
        )
    }
}

export default connect(mapStateToProps, null)(ResourceManagerContainer)