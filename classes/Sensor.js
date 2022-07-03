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

  static counter = 0


  constructor() {
    //starting up, heading clockwise
    this.directions = [0, 0, 0, 0, 0, 0, 0, 0]
  }

  sense(coords, register, range, log) {
    this.directions = [0, 0, 0, 0, 0, 0, 0, 0]

    Sensor.offsets.forEach((offset, index) => {
      this.directions[index] = this.#generateSense(offset, coords, register, range)
    })
  }

  #generateSense(offset, coords, register, remainingRange, maxRange = remainingRange) {
    
    if (remainingRange == 0) return 0

    const xVal = coords.x + (offset.x * (1 + maxRange - remainingRange))
    const yVal = coords.y + (offset.y * (1 + maxRange - remainingRange))


    // const sensedType = register.getTypeAt(xVal, yVal)
    // if (sensedType == "Life") {
    // if (log) console.log(remainingRange)
    if (register.objectExistsAt(xVal, yVal)) {
      return remainingRange
    } else {
      return this.#generateSense(offset, coords, register, remainingRange - 1, maxRange)
    }
    
  }
}

// sense(coords, register, range, log) {
//   this.directions = [0, 0, 0, 0, 0, 0, 0, 0]

//   Sensor.offsets.forEach((offset, index) => {
//     this.directions[index] = this.#generateSense(coords, offset, index, register, range, range, log)
//   })
// }

// #generateSense(coords, offset, register, remainingRange, maxRange = remainingRange, log) {
  
//   // if (this.directions[index] != 0) return

//   const xVal = coords.x + (offset.x * (1 + maxRange - remainingRange))
//   const yVal = coords.y + (offset.y * (1 + maxRange - remainingRange))

//   if (log) {
//     console.log(Sensor.counter, xVal, yVal)
//     Sensor.counter++
//   }

//   // const sensedType = register.getTypeAt(xVal, yVal)
//   // if (sensedType == "Life") {
//   // if (log) console.log(remainingRange)
//   if (register.objectExistsAt(xVal, yVal)) {
//     if (log) console.log(xVal, yVal)
//     this.directions[index] = remainingRange
//   } else {

//     if (remainingRange != 0) {
//       this.#generateSense(coords, offset, register, remainingRange - 1, maxRange, log)
//     } else {
//       this.directions[index] = 0
//     }
    
//   }
  
// }