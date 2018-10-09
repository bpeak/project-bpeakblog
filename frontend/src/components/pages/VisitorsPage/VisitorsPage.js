import React, { Fragment } from 'react'
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
        isLoggedIn,
        isFetching
    } = props
    return (
        <MainTemplate title="Visitors">
            <div className={cx('VisitorsPage')}>
                {visitorCards === undefined ? <LargeSpinner/> : 
                <Fragment>
                <div className={cx('VisitorCardForm-container')}>
                    <VisitorCardForm 
                    isLoggedIn={isLoggedIn}
                    isFetching={isFetching}
                    handleNewVisitorCard={handleNewVisitorCard}/>
                </div>
                <main className={cx('visitorCards')}>
                    {visitorCards.map((visitorCard) => (
                    <div className={cx('visitorCard-container')} key={visitorCard._id}>
                        <VisitorCard
                        isMember={visitorCard.isMember}
                        isAdmin={visitorCard.isAdmin}
                        nick={visitorCard.isMember ? visitorCard.memberAuthor.nick : visitorCard.nonMemberAuthor.nick}
                        profileImgSrc={visitorCard.isMember ? visitorCard.memberAuthor.profileImgSrc : undefined}
                        description={visitorCard.description}
                        createdDate={visitorCard.createdDate}
                        />
                    </div>
                    ))}
                </main>
                </Fragment>}
            </div>
        </MainTemplate>
    )
}

export default VisitorsPage