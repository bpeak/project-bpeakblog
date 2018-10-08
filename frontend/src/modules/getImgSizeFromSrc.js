const getImgSizeFromSrc = (src) => {
    return new Promise((resolve ,reject) => {
        
        if(!src){ return reject(new Error('getImgSizeFromSrc : src 이미지 존재X')) }

        const img = new Image()
        img.src = src
        img.onload = () => {
            const imgSize = {
                width : img.width,
                height : img.height
            }
            resolve(imgSize)
        }      
    })
}

export default getImgSizeFromSrc