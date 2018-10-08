const aiHelper = {
    update : {}
}

aiHelper.update.direction = (ai, mouse) => {
    const updatedAi = {...ai}
    if(mouse.isEntered && mouse.x && mouse.y){
        const distanceX = mouse.x - ai.x
        const distanceY = mouse.y - ai.y
        const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
        const sinTheta = distanceY / distance
        const cosTheta = distanceX / distance
        const directionX = cosTheta
        const directionY = sinTheta
        updatedAi.directionX = directionX
        updatedAi.directionY = directionY
        return updatedAi
    } else {
        return updatedAi
    }
}

aiHelper.update.speed = (ai, mouse) => {
    const updatedAi = {...ai}
    if(mouse.isEntered){
        updatedAi.speed = 4.5
        return updatedAi
    } else {
        updatedAi.speed = 3
        return updatedAi
    }   
}

aiHelper.update.position = (ai) => {
    const updatedAi = {...ai}
    const increaseX = ai.directionX * ai.speed
    const increaseY = ai.directionY * ai.speed
    updatedAi.x += increaseX
    updatedAi.y += increaseY
    return updatedAi
}

export default aiHelper