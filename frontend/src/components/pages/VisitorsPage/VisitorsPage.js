import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//styles
import classNames from 'classnames/bind'
import styles from './VisitorsPage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import VisitorCard from '~components/molecules/VisitorCard/VisitorCard'
import VisitorCardForm from '~components/molecules/VisitorCardForm/VisitorCardForm'
import LargeSpinner from '~components/atoms/spinners/LargeSpinner/LargeSpinner'

const VisitorsPage = (props) => {
    const { 
        visitorCards,
        handleNewVisitorCard,
        userState,
        isFetching,
        deleteVisitorCard,
    } = props
    return (
        <MainTemplate title="Visitors">
            <div className={cx('VisitorsPage')}>
                {visitorCards === undefined ? <div className={cx('spinner-container')}><LargeSpinner/></div> : 
                <Fragment>
                <div className={cx('VisitorCardForm-container')}>
                    <VisitorCardForm 
                        isLoggedIn={userState.isLoggedIn}
                        isFetching={isFetching}
                        handleNewVisitorCard={handleNewVisitorCard}
                    />
                </div>
                <main className={cx('visitorCards')}>
                    {visitorCards.map((visitorCard) => (
                    <div className={cx('visitorCard-container')} key={visitorCard._id}>
                        <VisitorCard
                            _id={visitorCard._id}
                            isMember={visitorCard.isMember}
                            isAdmin={visitorCard.isAdmin}
                            userState={userState}
                            nick={visitorCard.isMember ? visitorCard.memberAuthor.nick : visitorCard.nonMemberAuthor.nick}
                            profileImgSrc={visitorCard.isMember ? visitorCard.memberAuthor.profileImgSrc : undefined}
                            description={visitorCard.description}
                            createdDate={visitorCard.createdDate}
                            deleteVisitorCard={deleteVisitorCard}
                        />
                    </div>
                    ))}
                </main>
                </Fragment>}
            </div>
        </MainTemplate>
    )
}

VisitorsPage.propTypes = {
    visitorCards : PropTypes.array,
    userState : PropTypes.object.isRequired,
    isFetching : PropTypes.bool.isRequired,
    handleNewVisitorCard : PropTypes.func.isRequired,
}

export default VisitorsPage