const uniqueStringMaker = () => {
    const random1 = Math.random()
    const random2 = Math.random()
    return random1.toString(36) + String(Date.now()) + random2.toString(36)
}

export default uniqueStringMaker