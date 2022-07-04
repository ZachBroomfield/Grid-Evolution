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
    return this.#get(x, y)
  }

  set(x, y, value) {
    this.#set(x, y, value)
  }

  forEach(callback) {
    this.values.forEach(callback)
  }

  findIndex(searchValue) {
    for (let i = 0; i < this.width * this.height; i++) {
      if (this.values[i] === searchValue) {
        return {
          x: i % this.width,
          y: Math.floor(i / this.width)
        }
      }
    }

    return -1
  }

  #get(x, y) {
    if (this.#validPosition(x, y)) {
      return this.values[x + y * this.width]
    }

    return undefined
  }

  #set(x, y, value) {
    if (this.#validPosition(x, y)) {
      this.values[x + y * this.width] = value
    }
  }

  #validPosition(x, y) {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height)
  }
}