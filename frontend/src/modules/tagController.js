const extract = (text) => {
    const hashtags = []
    text.replace(/#[^#\s,;]+/gm, (val) => {
        hashtags.push(val);
    });
    return hashtags
}
   
const getTagsFromHashtags = (hashtags) => {
    const pattern = /#/
    const hashtagsExceptSharp = hashtags.map((hashtag) => {
        return hashtag.replace(pattern, '')
    })
    return hashtagsExceptSharp
}

const discriminator = (text) => {
    const pattern = /^#[^#\s,;]+/gm
    const result = pattern.exec(text)
    if(result === null){
        return false
    } else {
        return true
    }
}

const tagController = {
    extract,
    getTagsFromHashtags,
    discriminator
}

export default tagController

