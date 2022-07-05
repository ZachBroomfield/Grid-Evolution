import Coord2D from "./Coord2D.js"

export default class Movement {

  static up = new Coord2D({x: 0, y: -1})

  static right = new Coord2D({x: 1, y: 0})

  static down = new Coord2D({x: 0, y: 1})

  static left = new Coord2D({x: -1, y: 0})
}