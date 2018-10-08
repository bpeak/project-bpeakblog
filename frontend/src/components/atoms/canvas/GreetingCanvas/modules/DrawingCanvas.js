class DrawingCanvas {
    constructor(canvasElement, width, height){
        this.c = canvasElement
        if(width){ this.c.width = width}
        if(height){ this.c.height = height}
        this.ctx = canvasElement.getContext('2d')
    }
}

export default DrawingCanvas