import Circle from "./Circle.js"
import Sensor from "./Sensor.js"

export default class LifeForm extends Circle {
  constructor({coordinates, radius, colour, registeredWith, conversionFunc}) {
    super({coordinates, radius, colour})

    this.register = registeredWith
    this.conversionFunc = conversionFunc
    
    this.sensor = new Sensor()

    this.#updateRegister()

    this.nextMove = null
    this.lastUpdateFrame = 0
  }

  prepareMove() {
    this.sensor.sense(this.coordinates, this.register, 4)
    if (this.colour === 'green') {
      this.nextMove = {
        x: 1,
        y: 1
      }
    }

    if (this.colour === 'yellow') {
      this.nextMove = {
        x: -1,
        y: -1
      }
    }
  }

  update(frame) {
    if (this.lastUpdateFrame == frame) return
    this.lastUpdateFrame = frame
    // this.sensor.sense(this.coordinates, this.register, 4)
    
    if (this.nextMove) this.move(this.nextMove)
  }

  move(direction) {
    const newPosition = {
      x: this.coordinates.x + direction.x,
      y: this.coordinates.y + direction.y
    }

    if (this.register.validMove(newPosition.x, newPosition.y)) {
      this.coordinates = newPosition
      this.#updateRegister()
    }
  }

  draw(ctx) {
    const coord = this.conversionFunc(this.coordinates)

    ctx.beginPath()
    ctx.arc(coord.x, coord.y, this.radius, Math.PI * 2, false)
    ctx.fillStyle = this.colour
    ctx.fill()

    this.#tempDrawSensors(ctx, coord)
  }

  #updateRegister() {
    this.register.updateRegister(this)
  }

  #tempDrawSensors(ctx) {
    this.sensor.directions.forEach((direction, index) => {
      if (direction != 0) {
        const xPos = this.coordinates.x + (Sensor.offsets[index].x * (5 - direction))
        const yPos = this.coordinates.y + (Sensor.offsets[index].y * (5 - direction))

        const drawPos = this.conversionFunc({
          x: xPos, 
          y: yPos
        })

        ctx.globalAlpha = 1/4

        ctx.beginPath()
        ctx.arc(drawPos.x, drawPos.y, this.radius * 2, Math.PI * 2, false)
        ctx.fillStyle = this.colour
        ctx.fill()

        ctx.globalAlpha = 1
      }
    })
  }
}