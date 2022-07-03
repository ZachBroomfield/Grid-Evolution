export default class Grid {
  constructor({dimensions, spacing, topLeft, gridLines}) {
    this.dimensions = dimensions
    this.spacing = spacing
    this.topLeft = topLeft
    this.gridLines = gridLines
  }

  coordToPosition() {
    const offset = (this.spacing) / 2

    return (coordinates) => {
      return {
        x: this.topLeft.x + offset + (this.spacing * (coordinates.x - 1)),
        y: this.topLeft.y + offset + (this.spacing * (coordinates.y - 1)),
      }
    }
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