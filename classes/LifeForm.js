import Circle from "./Circle.js"
import Sensor from "./Sensor.js"
import Movement from "./Movement.js"
import Network from "./neuralNetwork/Network.js"
import Coord2D from "./Coord2D.js"
import { getColours } from "../utils.js"

export default class LifeForm extends Circle {

  static maxEnergy = 200

  constructor({coordinates, spacing, colour, registeredWith, coordToPosition, energy, brain = null, frame = 1}) {
    const radius = Math.floor(spacing / 2 - 2)

    super({coordinates, radius, colour})
    this.energy = energy

    this.spacing = spacing

    this.registerHandler = registeredWith
    this.coordToPosition = coordToPosition
    
    this.sensor = new Sensor()

    this.age = 0

    this.nextMove = null
    this.lastUpdatedFrame = frame

    // if (brain) {
    //   this.brain = brain
    //   Network.mutate(this.brain, 0.1)
    // } else {
    //   this.brain = new Network({
    //     neuronCounts: [9, 10, 5]
    //   })
    // }

    this.brain = new Network({
      neuronCounts: [9, 12, 10, 5],
      brain: brain,
      mutationRate: 0.05
    })

    this.#updateRegister()
  }

  update(frame) {
    if (this.lastUpdatedFrame == frame) return
    this.lastUpdatedFrame = frame

    this.age += 1

    this.energy -= 1
    // console.log(this.energy)
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
    const newPosition = Coord2D.sumCoords(this.coordinates, movement)

    if (this.registerHandler.validMove(newPosition)) {
      this.coordinates = newPosition
      this.#updateRegister()
    }
  }

  eat(foodValue) {
    this.energy += foodValue

    if (this.energy > LifeForm.maxEnergy) this.energy = LifeForm.maxEnergy
  }

  getType() {
    return "Life"
  }

  draw(ctx) {
    const position = this.coordToPosition(this.coordinates)

    ctx.beginPath()
    ctx.arc(position.x, position.y, this.radius, Math.PI * 2, false)
    ctx.fillStyle = this.colour
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
    this.sensor.sense(this.coordinates, this.registerHandler, 4)

    const offsets = this.sensor.directions.map(direction => {
      return direction / 4
    })

    offsets.push(this.energy / LifeForm.maxEnergy)

    const outputs = Network.feedForward(offsets, this.brain)

    if (outputs[4] && this.energy >= 4 && this.age > 10) {
      const childCell = this.#findChildCell()

      if (childCell) {
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
      return this.registerHandler.validMove(Coord2D.sumCoords(this.coordinates, offset))
    })

    if (validCells.length === 0) return false

    const rand = Math.floor(Math.random() * validCells.length)

    return Coord2D.sumCoords(this.coordinates, validCells[rand])
  }

  #reproduce(childCell) {
    const halfEnergy = Math.floor(this.energy / 2)
    let colour = this.colour
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