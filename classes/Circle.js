import Coord2D from "./Coord2D"

export default class Circle {
  constructor({coordinates, radius, colour}) {
    this.coordinates = new Coord2D(coordinates)
    this.radius = radius
    this.colour = colour
  }
}