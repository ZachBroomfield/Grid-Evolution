import Circle from "./Circle.js"
import Sensor from "./Sensor.js"

export default class LifeForm extends Circle {
  constructor({coordinates, radius, colour, registeredWith, coordToPosition, energy}) {
    super({coordinates, radius, colour})
    this.energy = energy

    this.registerHandler = registeredWith
    this.coordToPosition = coordToPosition
    
    this.sensor = new Sensor()

    this.nextMove = null
    this.lastUpdatedFrame = 1

    this.#updateRegister()
  }

  update(frame) {
    if (this.lastUpdatedFrame == frame) return
    this.lastUpdatedFrame = frame

    this.#prepareMove()

    this.energy -= 1
    if (this.energy <= 0) {
      this.#removeFromRegister()

      return
    }

    if (this.nextMove) {
      this.move(this.nextMove)
    }
  }

  move(direction) {
    const newPosition = {
      x: this.coordinates.x + direction.x,
      y: this.coordinates.y + direction.y
    }

    if (this.registerHandler.validMove(newPosition.x, newPosition.y)) {
      this.coordinates = newPosition
      this.#updateRegister()
    }
  }

  eat(foodValue) {
    this.energy += foodValue
  }

  getType() {
    return "Life"
  }

  draw(ctx) {
    console.log(this.colour, this.sensor.directions)
    const coord = this.coordToPosition(this.coordinates)

    ctx.beginPath()
    ctx.arc(coord.x, coord.y, this.radius, Math.PI * 2, false)
    ctx.fillStyle = this.colour
    ctx.fill()

    // this.#tempDrawSensors(ctx, coord)
  }

  #updateRegister() {
    this.registerHandler.update(this)
  }

  #removeFromRegister() {
    this.registerHandler.remove(this)
  }

  #prepareMove() {
    this.sensor.sense(this.coordinates, this.registerHandler, 4)

    if (this.colour === 'yellow') {
      this.nextMove = {
        x: -1,
        y: 0
      }
    }
  }

  // #tempDrawSensors(ctx) {
  //   this.sensor.directions.forEach((direction, index) => {
  //     if (direction != 0) {
  //       const xPos = this.coordinates.x + (Sensor.offsets[index].x * (5 - direction))
  //       const yPos = this.coordinates.y + (Sensor.offsets[index].y * (5 - direction))

  //       const drawPos = this.coordToPosition({
  //         x: xPos, 
  //         y: yPos
  //       })

  //       ctx.globalAlpha = 1/4

  //       ctx.beginPath()
  //       ctx.arc(drawPos.x, drawPos.y, this.radius * 2, Math.PI * 2, false)
  //       ctx.fillStyle = this.colour
  //       ctx.fill()

  //       ctx.globalAlpha = 1
  //     }
  //   })
  // }
}