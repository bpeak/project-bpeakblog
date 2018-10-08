export default () => {
    const uniqueString = Math.random().toString(36) + String(Number(new Date()))
    return uniqueString
}