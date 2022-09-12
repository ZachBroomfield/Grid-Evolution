import Circle from "./Circle.js"
import Sensor from "./Sensor.js"
import Movement from "./Movement.js"
import Network from "./neuralNetwork/Network.js"
import Coord2D from "./Coord2D.js"
import { getColours } from "../utils.js"

export default class LifeForm extends Circle {

  static #maxEnergy = 400

  constructor({coordinates, spacing, colour, registeredWith, coordToPosition, energy, brain = null, frame = 1}) {
    const radius = Math.floor(spacing / 2 - 2)

    super({coordinates, radius, colour})
    this.energy = energy

    this.spacing = spacing

    this.registerHandler = registeredWith
    this.coordToPosition = coordToPosition
    
    this.sensor = new Sensor()

    this.age = 0
    this.reproductionCooldown = 60

    this.nextMove = null
    this.lastUpdatedFrame = frame

    this.brain = new Network({
      neuronCounts: [25, 30, 20, 5],
      brain: brain,
      mutationRate: 0.05
    })

    this.#updateRegister()
  }

  update(frame) {
    if (this.lastUpdatedFrame == frame) return
    this.lastUpdatedFrame = frame

    this.age += 1
    this.reproductionCooldown -= 1

    this.energy -= 1

    if (this.energy <= 0) {
      this.#removeFromRegister()

      return
    }

    this.#prepareTurn()

    if (this.nextMove) {
      this.move(this.nextMove)
    }
  }

  move(movement) {
    const newPosition = Coord2D.sumCoords(this.getCoordinates(), movement)

    if (this.registerHandler.validMove(newPosition)) {
      this.setCoordinates(newPosition)
      this.#updateRegister()
    }
  }

  eat(foodValue) {
    this.energy += foodValue

    if (this.energy > LifeForm.maxEnergy) this.energy = LifeForm.#maxEnergy
  }

  getType() {
    return "Life"
  }

  draw(ctx) {
    const position = this.coordToPosition(this.getCoordinates())

    ctx.beginPath()
    ctx.arc(position.x, position.y, this.getRadius(), Math.PI * 2, false)
    ctx.fillStyle = this.getColour()
    ctx.fill()
  }

  #updateRegister() {
    this.registerHandler.update(this)
  }

  #removeFromRegister() {
    this.registerHandler.addAge(this.age)
    this.registerHandler.remove(this)
  }

  #prepareTurn() {
    this.sensor.sense(this.getCoordinates(), this.registerHandler, 32)

    const lifeOffsets = this.sensor.lifeSense.map(direction => {
      return direction / 8
    })

    const foodOffsets = this.sensor.foodSense.map(direction => {
      return direction / 32
    })

    const wallOffsets = this.sensor.wallSense.map(direction => {
      return direction / 8
    })

    const offsets = lifeOffsets.concat(foodOffsets).concat(wallOffsets)

    offsets.push(this.energy / LifeForm.#maxEnergy)

    const outputs = Network.feedForward(offsets, this.brain)

    if (outputs[4] && this.energy >= 4 && this.reproductionCooldown <= 0) {
      const childCell = this.#findChildCell()

      if (childCell) {
        this.reproductionCooldown = 30
        this.#reproduce(childCell)
        return
      }
    }

    let nextMove = new Coord2D({x: 0, y: 0})

    if (outputs[0]) nextMove.add(Movement.up)
    if (outputs[1]) nextMove.add(Movement.right)
    if (outputs[2]) nextMove.add(Movement.down)
    if (outputs[3]) nextMove.add(Movement.left)

    this.nextMove = nextMove
  }

  #findChildCell() {
    const validCells = Sensor.offsets.filter(offset => {
      return this.registerHandler.validMove(Coord2D.sumCoords(this.getCoordinates(), offset))
    })

    if (validCells.length === 0) return false

    const rand = Math.floor(Math.random() * validCells.length)

    return Coord2D.sumCoords(this.getCoordinates(), validCells[rand])
  }

  #reproduce(childCell) {
    const halfEnergy = Math.floor(this.energy / 2)
    let colour = this.getColour()
    if (Math.random() < 0.0001) {
      const rand = Math.floor(Math.random() * getColours().length)
      colour = getColours()[rand].name
    }

    new LifeForm({
      coordinates: childCell, 
      spacing: this.spacing,
      colour: colour,
      registeredWith: this.registerHandler,
      coordToPosition: this.coordToPosition,
      energy: halfEnergy,
      brain: this.brain,
      frame: this.lastUpdatedFrame
    }).brain

    this.energy -= halfEnergy
  }
}