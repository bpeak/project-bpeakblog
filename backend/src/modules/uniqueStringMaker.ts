export default () : string => {
    const random1 : number = Math.random()
    const random2 : number = Math.random()
    const uniqueString = random1.toString(36) + String(Number(new Date())) + random2.toString(36)
    return uniqueString
}