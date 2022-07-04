export default class Grid {
  constructor({dimensions, gridLines, coordToPosition}) {
    this.dimensions = dimensions
    this.gridLines = gridLines
    this.coordToPosition = coordToPosition
  }

  drawLines(ctx) {
    this.#drawGridLines(ctx)
  }

  #drawGridLines(ctx) {
    ctx.strokeStyle = 'gray'
    this.gridLines.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      ctx.stroke()
    })
  }
}