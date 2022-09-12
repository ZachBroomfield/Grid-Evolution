import Circle from "./Circle.js"

export default class Food extends Circle {
  #register
  #coordToPosition
  #energyValue
  constructor({coordinates, spacing, colour, registeredWith, coordToPosition, energyValue = 20}) {
    const radius = Math.floor(spacing / 2 - 2)

    super({coordinates, radius, colour})

    this.#register = registeredWith
    this.#coordToPosition = coordToPosition
    this.#energyValue = energyValue

    this.#updateRegister()
  }

  getType() {
    return "Food"
  }

  update() {
    
  }

  draw(ctx) {
    const position = this.#coordToPosition(this.getCoordinates())

    ctx.beginPath()
    ctx.arc(position.x, position.y, this.getRadius(), Math.PI * 2, false)
    ctx.fillStyle = this.getColour()
    ctx.fill()
  }

  getEnergy() {
    return this.#energyValue
  }

  #updateRegister() {
    this.#register.update(this)
  }
}