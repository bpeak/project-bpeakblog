import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchCreator from '~modules/fetchCreator'
//actions
import * as visitorCardsActionCreators from '~redux/visitorCards/actionCreators'
//components
import VisitorsPage from '~components/pages/VisitorsPage/VisitorsPage'

const mapStateToProps = (state) => ({
    visitorCardsState : state.visitorCards,
    userState : {
        isLoggedIn : state.user.isLoggedIn
    }
})

const mapDispatchToProps = (dispatch) => ({
    visitorCardsActions : {
        visitorCardsReceived : (payload) => { dispatch(visitorCardsActionCreators.visitorCardsReceived(payload)) },
        newVisitorCardReceived : (payload) => { dispatch(visitorCardsActionCreators.newVisitorCardReceived(payload))}
    }
})

class VisitorsPageContainer extends Component {
    state = { isFetching : false }

    _setIsFetching = (isFetching) => { this.setState(() => ({ isFetching }))}

    _getAllVisitorCards = () => {
        return fetchCreator('/api/visitorCards', {
            method : "GET",
        }, 'visitorCards 요청')
    }

    _fetchNonMemberVisitorCard = (comment) => {
        return fetchCreator('/api/visitorCards/forNonMember', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                nick : comment.nick,
                description : comment.description
            })
        }, 'visitorCard 작성(비회원)')
    }

    _fetchMemberVisitorCard = (comment) => {
        return fetchCreator('/api/visitorCards/forMember', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({ description : comment.description })
        }, 'visitorCard 작성(회원)')
    }

    handleNewVisitorCard = async (comment) => {
        this._setIsFetching(true)
        console.log(comment, '보낼건딩')
        const isLoggedIn = this.props.userState.isLoggedIn
        const response = isLoggedIn ? await this._fetchMemberVisitorCard(comment) : await this._fetchNonMemberVisitorCard(comment)
        if(!response){ return }
        this.props.visitorCardsActions.newVisitorCardReceived({ visitorCard : response.visitorCard })
        this._setIsFetching(false)
    }

    async componentDidMount(){
        if(this.props.visitorCardsState.items !== undefined) { return }

        const response = await this._getAllVisitorCards()
        if(!response) { return }
        this.props.visitorCardsActions.visitorCardsReceived({ visitorCards : response.visitorCards })
    }

    render() {
        return (
            <VisitorsPage
            visitorCards={this.props.visitorCardsState.items}
            isLoggedIn={this.props.userState.isLoggedIn}
            isFetching={this.state.isFetching}
            handleNewVisitorCard={this.handleNewVisitorCard}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorsPageContainer)