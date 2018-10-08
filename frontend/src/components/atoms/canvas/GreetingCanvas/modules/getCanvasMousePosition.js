const getCanvasMousePosition = (canvas, e) => {
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.scrollWidth / canvas.width
    const sy = canvas.scrollHeight / canvas.height

    const mouse = {
        x : (e.clientX - rect.left) / sx,
        y : (e.clientY - rect.top) / sy
    }

    return mouse
}

export default getCanvasMousePosition