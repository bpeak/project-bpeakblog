const textValidator = {
    validateMinLength : (text, min) => {
        return ( String(text).length >= min )
    },
    validateMaxLength : (text, max) => {
        return ( String(text).length <= max )
    },
    validateBlank : (text) => {
        return ( String(text).indexOf(' ') === -1 )
    }
}

export default textValidator