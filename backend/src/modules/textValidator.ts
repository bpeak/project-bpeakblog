const textValidator = {
    validateMinLength : (text : string, min : number) : boolean => {
        return text.length >= min
    },
    validateMaxLength : (text : string, max : number) : boolean => {
        return text.length <= max
    }, 
    validateBlank : (text : string) : boolean => {
        return text.indexOf(' ') === -1
    }
}

export default textValidator