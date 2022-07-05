import CanvasHandler from "./classes/CanvasHandler.js"
import GridFactory from "./classes/GridFactory.js"
import LifeForm from "./classes/LifeForm.js"
import Food from "./classes/Food.js"
import RegisterHandler from "./classes/RegisterHandler.js"
import { getColours } from "./utils.js"

const gridCanvas = new CanvasHandler({id: 'gridCanvas'})

const grid = GridFactory.create({
  dimensions: {
    x: 100,
    y: 100
  },
  canvasSize: gridCanvas.getDimensions(),
  midPoint: gridCanvas.getMidPoint()
})

const objectRegister = new RegisterHandler({
  width: grid.dimensions.x,
  height: grid.dimensions.y
})

function createLife(amount) {
  for (let i = 0; i < amount; i++) {
    const randCoords = {
      x: Math.ceil(Math.random() * grid.dimensions.x),
      y: Math.ceil(Math.random() * grid.dimensions.y)
    }
  
    if (objectRegister.getObjectAt(randCoords.x, randCoords.y) === null) {
      const rand = Math.floor(Math.random() * getColours().length)
      new LifeForm({
        coordinates: randCoords,
        spacing: grid.getSpacing(),
        colour: getColours()[rand].name,
        registeredWith: objectRegister,
        coordToPosition: grid.coordToPosition,
        energy: 100
      })
    }
  }
}

function addFood(amount) { //bad implementation
  for (let i = 0; i < amount; i++) {
    const randCoords = {
      x: Math.ceil(Math.random() * grid.dimensions.x),
      y: Math.ceil(Math.random() * grid.dimensions.y)
    }
  
    if (objectRegister.getObjectAt(randCoords.x, randCoords.y) === null) {
      new Food({
        coordinates: randCoords,
        spacing: grid.getSpacing(),
        colour: 'green',
        registeredWith: objectRegister,
        coordToPosition: grid.coordToPosition,
        energyValue: 100
      })
    }
  }
}

let timer = 10

createLife(50)
addFood(150)
animate()

function animate() {
  if (timer % 10 == 0) {
    gridCanvas.clear()

    grid.drawLines(gridCanvas.getCtx())

    objectRegister.incrementFrame()
    
    objectRegister.eachObject(obj => {
      if (obj != null) {
        obj.update(objectRegister.getCurrentFrame())
      }
    })

    addFood(8)

    if (timer % 120 === 0) console.log(objectRegister.averageAge())

    objectRegister.eachObject(obj => {
      if (obj != null) {
        obj.draw(gridCanvas.getCtx())
      }
    })
  }

  timer++
  requestAnimationFrame(animate)
}