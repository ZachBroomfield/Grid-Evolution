import Grid from "./Grid.js"
import GridLine from "./GridLine.js"

export default class GridFactory {
  static create({dimensions, spacing, midPoint}) {
    return this.#createGrid(dimensions, spacing, midPoint)
  }

  static #createGrid(dimensions, spacing, midPoint) {
    const topLeft = this.#calcTopLeft(dimensions, spacing, midPoint)

    const gridLines = this.#createGridLines(dimensions, spacing, topLeft)

    const coordToPosition = this.coordToPosition(spacing, topLeft)

    return new Grid({dimensions, gridLines, coordToPosition})
  }

  static coordToPosition(spacing, topLeft) {
    const offset = (spacing) / 2

    return (coordinates) => {
      return {
        x: topLeft.x + offset + (spacing * (coordinates.x - 1)),
        y: topLeft.y + offset + (spacing * (coordinates.y - 1)),
      }
    }
  }

  static #calcTopLeft(dimensions, spacing, midPoint) {
    const topLeftX = Math.round(midPoint.x - (dimensions.x * spacing) / 2)
    const topLeftY = Math.round(midPoint.y - (dimensions.y * spacing) / 2)

    return {
      x: topLeftX,
      y: topLeftY
    }
  }

  static #createGridLines(dimensions, spacing, topLeft) {
    const gridLines = []

    const height = this.#calcHeight(dimensions, spacing)
    const width = this.#calcWidth(dimensions, spacing)

    for (let i = 0; i <= dimensions.x; i++) {
      gridLines.push(
        new GridLine({
          start: {
            x: topLeft.x + i * spacing,
            y: topLeft.y
          },
          end: {
            x: topLeft.x + i * spacing,
            y: topLeft.y + height
          } 
        })
      )
    }

    for (let i = 0; i <= dimensions.y; i++) {
      gridLines.push(
        new GridLine({
          start: {
            x: topLeft.x ,
            y: topLeft.y + i * spacing
          },
          end: {
            x: topLeft.x + width,
            y: topLeft.y + i * spacing
          } 
        })
      )
    }

    return gridLines
  }

  static #calcHeight(dimensions, spacing) {
    return dimensions.y * spacing
  }

  static #calcWidth(dimensions, spacing) {
    return dimensions.x * spacing
  }
}