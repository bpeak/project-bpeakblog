const isoDateToTimeText = (isoDate) => {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const timeText = `${year}년 ${month}월 ${day}일`
    return timeText
}

export default isoDateToTimeText