import CanvasHandler from "./classes/CanvasHandler.js"
import GridFactory from "./classes/GridFactory.js"
import LifeForm from "./classes/LifeForm.js"
import Food from "./classes/Food.js"
import RegisterHandler from "./classes/RegisterHandler.js"

const gridCanvas = new CanvasHandler({id: 'gridCanvas'})

const grid = GridFactory.create({
  dimensions: {
    x: 9,
    y: 10
  },
  spacing: 50,
  midPoint: gridCanvas.getMidPoint()
})

const objectRegister = new RegisterHandler({
  width: grid.dimensions.x,
  height: grid.dimensions.y
})

function createLife() {
  new LifeForm({
    coordinates: {
      x: 4,
      y: 6
    }, 
    radius: 20,
    colour: 'blue',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })
  
  new LifeForm({
    coordinates: {
      x: 8,
      y: 6
    }, 
    radius: 20,
    colour: 'blue',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })
  
  new LifeForm({
    coordinates: {
      x: 4,
      y: 4
    }, 
    radius: 20,
    colour: 'blue',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })
  
  const life4 = new LifeForm({
    coordinates: {
      x: 8,
      y: 8
    }, 
    radius: 20,
    colour: 'blue',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })
  
  new LifeForm({
    coordinates: {
      x: 3,
      y: 3
    }, 
    radius: 20,
    colour: 'blue',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })
  
  new LifeForm({
    coordinates: {
      x: 4,
      y: 9
    }, 
    radius: 20,
    colour: 'yellow',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energy: 4
  })

  new Food({
    coordinates: {
      x: 2,
      y: 9
    },
    colour: 'green',
    registeredWith: objectRegister,
    coordToPosition: grid.coordToPosition,
    energyValue: 10
  })
}

console.log(objectRegister)

let timer = 120

createLife()
animate()

function animate() {
  if (timer % 120 == 0) {
    gridCanvas.clear()

    grid.drawLines(gridCanvas.getCtx())

    objectRegister.incrementFrame()
    
    objectRegister.eachObject(obj => {
      if (obj != null) {
        obj.update(objectRegister.getCurrentFrame())
      }
    })

    objectRegister.eachObject(obj => {
      if (obj != null) {
        obj.draw(gridCanvas.getCtx())
      }
    })
  }

  timer++
  requestAnimationFrame(animate)
}