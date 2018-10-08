const imgFileReader = (file) => {
    return new Promise(resolve => {
        const reader  = new FileReader()
        reader.addEventListener("load", () => {
            const src = reader.result
            resolve(src)
        }, false)
        reader.readAsDataURL(file)
    })
}

export default imgFileReader