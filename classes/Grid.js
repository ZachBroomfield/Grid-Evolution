export default class Grid {
  constructor({dimensions, gridLines, spacing, coordToPosition}) {
    this.dimensions = dimensions
    this.gridLines = gridLines
    this.spacing = spacing
    this.coordToPosition = coordToPosition
  }

  drawLines(ctx) {
    this.#drawGridLines(ctx)
  }

  getSpacing() {
    return this.spacing
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