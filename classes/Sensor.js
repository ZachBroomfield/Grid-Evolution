import Coord2D from "./Coord2D.js"

export default class Sensor {
  static offsets = [
    new Coord2D({x: 0, y: -1}),
    new Coord2D({x: 1, y: -1}),
    new Coord2D({x: 1, y: 0}),
    new Coord2D({x: 1, y: 1}),
    new Coord2D({x: 0, y: 1}),
    new Coord2D({x: -1, y: 1}),
    new Coord2D({x: -1, y: 0}),
    new Coord2D({x: -1, y: -1}),
  ]

  constructor() {
    //starting up, heading clockwise
    this.lifeSense = [0, 0, 0, 0, 0, 0, 0, 0]
    this.foodSense = [0, 0, 0, 0, 0, 0, 0, 0]
    this.wallSense = [0, 0, 0, 0, 0, 0, 0, 0]
  }

  sense(coords, registerHandler, range) {
    this.lifeSense = [0, 0, 0, 0, 0, 0, 0, 0]
    this.foodSense = [0, 0, 0, 0, 0, 0, 0, 0]
    this.wallSense = [0, 0, 0, 0, 0, 0, 0, 0]

    Sensor.offsets.forEach((offset, index) => {
      const sensed = this.#generateSense(offset, coords, registerHandler, range)
      
      switch (sensed.type) {
        case "Life":
          this.lifeSense[index] = sensed.value
          break
        case "Food":
          this.foodSense[index] = sensed.value
          break
        case "Wall":
          this.wallSense[index] = sensed.value
          break
      }
    })
  }

  #generateSense(offset, coords, registerHandler, remainingRange, maxRange = remainingRange) {
    
    if (remainingRange == 0) return 0

    const xVal = coords.x + (offset.x * (1 + maxRange - remainingRange))
    const yVal = coords.y + (offset.y * (1 + maxRange - remainingRange))

    const sensedObject = registerHandler.getObjectAt(xVal, yVal)

    if (sensedObject) {
      return {value: remainingRange, type: sensedObject.getType()}
    } else {
      if (sensedObject === undefined) {
        return {value: remainingRange, type: "Wall"}
      }
      return this.#generateSense(offset, coords, registerHandler, remainingRange - 1, maxRange)
    }
    
  }
}