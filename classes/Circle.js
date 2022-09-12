import Coord2D from "./Coord2D"

export default class Circle {
  #coordinates
  #radius
  #colour

  constructor({coordinates, radius, colour}) {
    this.#coordinates = new Coord2D(coordinates)
    this.#radius = radius
    this.#colour = colour
  }

  getCoordinates() {
    return this.#coordinates
  }

  setCoordinates(newCoordinates) {
    this.#coordinates = newCoordinates
  }

  getRadius() {
    return this.#radius
  }

  getColour() {
    return this.#colour
  }
}