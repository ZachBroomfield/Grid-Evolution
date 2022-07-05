export default class Coord2D {
  constructor({x, y}) {
    this.x = x
    this.y = y
  }

  add({x, y}) {
    this.x += x
    this.y += y
  }

  static sumCoords(first, second) {
    return new Coord2D({
      x: first.x + second.x,
      y: first.y + second.y
    })
  }
}