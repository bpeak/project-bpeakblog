import moment from 'moment'

const dateConverter = {
    getTimeAgoStamp : (ISODate) => {
        const now = moment()
        const ago = moment(ISODate)
        const diff_day = now.diff(ago, 'days')
        const diff_month = now.diff(ago, 'months')
        const diff_year = now.diff(ago, 'years')
        if(diff_year !== 0) { return `${diff_year} years ago` }
        if(diff_month !== 0) { return `${diff_month} months ago` }
        if(diff_day !== 0) { return `${diff_day} days ago` }
        return 'today'
    },
    getFullTimeStamp : (ISODate) => {
        const date = new Date(ISODate)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return `${year}년 ${month}월 ${day}일`
    }
}

export default dateConverter