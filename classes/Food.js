import Circle from "./Circle.js"

export default class Food extends Circle {
  constructor({coordinates, spacing, colour, registeredWith, coordToPosition, energyValue = 20}) {
    const radius = Math.floor(spacing / 2 - 2)

    super({coordinates, radius, colour})

    this.register = registeredWith
    this.coordToPosition = coordToPosition
    this.energyValue = energyValue

    this.#updateRegister()
  }

  getType() {
    return "Food"
  }

  update() {
    // this.energyValue -= 1
    // this.radius = this.energyValue

    // if (this.energyValue == 0) {
    //   this.#removeFromRegister()
    // }
  }

  draw(ctx) {
    const coord = this.coordToPosition(this.coordinates)

    ctx.beginPath()
    ctx.arc(coord.x, coord.y, this.radius, Math.PI * 2, false)
    ctx.fillStyle = this.colour
    ctx.fill()
  }

  getEnergy() {
    return this.energyValue
  }

  #updateRegister() {
    this.register.update(this)
  }

  #removeFromRegister() {
    this.register.remove(this)
  }
}