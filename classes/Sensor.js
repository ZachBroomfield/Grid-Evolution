export default class Sensor {
  static offsets = [
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 0, y: 1},
    {x: -1, y: 1},
    {x: -1, y: 0},
    {x: -1, y: -1},
  ]

  // static counter = 0


  constructor() {
    //starting up, heading clockwise
    this.directions = [0, 0, 0, 0, 0, 0, 0, 0]
  }

  sense(coords, registerHandler, range) {
    this.directions = [0, 0, 0, 0, 0, 0, 0, 0]

    Sensor.offsets.forEach((offset, index) => {
      this.directions[index] = this.#generateSense(offset, coords, registerHandler, range)
    })
  }

  #generateSense(offset, coords, registerHandler, remainingRange, maxRange = remainingRange) {
    
    if (remainingRange == 0) return 0

    const xVal = coords.x + (offset.x * (1 + maxRange - remainingRange))
    const yVal = coords.y + (offset.y * (1 + maxRange - remainingRange))

    const sensedObject = registerHandler.getObjectAt(xVal, yVal)

    if (sensedObject) {
      if (sensedObject.getType() === "Food") return -remainingRange

      return remainingRange
    } else {
      return this.#generateSense(offset, coords, registerHandler, remainingRange - 1, maxRange)
    }
    
  }
}