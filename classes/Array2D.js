export default class Array2D {
  constructor(width, height) {
    this.values = []
    this.width = width
    this.height = height
    
    for (let i = 0; i < width * height; i++) {
      this.values.push(null)
    }
  }

  get(x, y) {
    return this.values[x + y * this.width]
  }

  set(x, y, value) {
    this.values[x + y * this.width] = value
  }

  valueExistsAt(x, y) {
    return this.validPosition(x, y) && (this.get(x, y) != null)
  }

  forEachObject(callback) {
    this.values.forEach(callback)
  }

  findIndex(value) {
    for (let i = 0; i < this.width * this.height; i++) {
      if (this.values[i] === value) {
        return {
          x: i % this.width,
          y: Math.floor(i / this.width)
        }
      }
    }

    return -1
  }

  validPosition(x, y) {
    return (x >= 0 && x < this.width) &&
      (y >= 0 && y < this.height)
  }
}