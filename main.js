import CanvasHandler from "./classes/CanvasHandler.js"
import GridFactory from "./classes/GridFactory.js"
import LifeForm from "./classes/LifeForm.js"
import Register from "./classes/Register.js"

const gridCanvas = new CanvasHandler({id: 'gridCanvas'})

const grid = GridFactory.create({
  dimensions: {
    x: 9,
    y: 10
  },
  spacing: 50,
  midPoint: gridCanvas.getMidPoint()
})

const objectRegister = new Register({
  width: grid.dimensions.x,
  height: grid.dimensions.y
})

function createLife() {
  new LifeForm({
    coordinates: {
      x: 4,
      y: 6
    }, 
    radius: 10,
    colour: 'blue',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
  
  new LifeForm({
    coordinates: {
      x: 8,
      y: 6
    }, 
    radius: 10,
    colour: 'red',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
  
  new LifeForm({
    coordinates: {
      x: 4,
      y: 4
    }, 
    radius: 10,
    colour: 'green',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
  
  const life4 = new LifeForm({
    coordinates: {
      x: 9,
      y: 10
    }, 
    radius: 10,
    colour: 'yellow',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
  
  new LifeForm({
    coordinates: {
      x: 3,
      y: 3
    }, 
    radius: 10,
    colour: 'orange',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
  
  new LifeForm({
    coordinates: {
      x: 2,
      y: 2
    }, 
    radius: 10,
    colour: 'pink',
    registeredWith: objectRegister,
    conversionFunc: grid.coordToPosition()
  })
}

let timer = 120

createLife()
animate()

function animate() {
  if (timer % 120 == 0) {
    gridCanvas.clear()

    grid.drawLines(gridCanvas.getCtx())
  
    //is this the correct order????

    objectRegister.incrementFrame()
  
    

    objectRegister.eachObject(object => {
      if (object != null) {
        object.update(objectRegister.getCurrentFrame())
      }
    })

    objectRegister.eachObject(object => {
      if (object != null) {
        object.prepareMove()
      }
    })

    objectRegister.eachObject(object => {
      if (object != null) {
        object.draw(gridCanvas.getCtx())
      }
    })
  }

  timer++
  requestAnimationFrame(animate)
}