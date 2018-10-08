const imgLoader = (imgSrc) => {
    return new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.src = imgSrc
    })
}

export default imgLoader