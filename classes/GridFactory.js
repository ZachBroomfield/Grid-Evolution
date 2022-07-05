import Grid from "./Grid.js"
import GridLine from "./GridLine.js"

export default class GridFactory {
  static create({dimensions, canvasSize, midPoint}) {
    return this.#createGrid(dimensions, canvasSize, midPoint)
  }

  static #createGrid(dimensions, canvasSize, midPoint) {
    dimensions = this.#normaliseDimensions(dimensions)

    const spacing = this.#calcSpacing(dimensions, canvasSize)

    const topLeft = this.#calcTopLeft(dimensions, spacing, midPoint)

    const gridLines = this.#createGridLines(dimensions, spacing, topLeft)

    const coordToPosition = this.coordToPosition(spacing, topLeft)

    return new Grid({dimensions, gridLines, spacing, coordToPosition})
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

  static #normaliseDimensions(dimensions) {
    return {
      x: Math.min(dimensions.x, 100),
      y: Math.min(dimensions.y, 100)
    }
  }

  static #calcSpacing(dimensions, canvasSize) {
    const maxWidth = Math.floor(canvasSize.width * 0.9)
    const maxHeight = Math.floor(canvasSize.height * 0.9)

    const widthSpacing = Math.floor((maxWidth - dimensions.x) / dimensions.x)
    const heightSpacing = Math.floor((maxHeight - dimensions.y) / dimensions.y)

    return Math.min(widthSpacing, heightSpacing)
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