import Array2D from "./Array2D.js"

export default class Register {
  constructor({width, height}) {
    this.array2D = new Array2D(width, height)
  }

  get(x, y) { 
    return this.#get(x, y)
  }

  set(x, y, value) { 
    this.#set(x, y, value)
  }

  findIndex(value) { 
    return this.#findIndex(value)
  }

  forEach(callback) {
    this.array2D.forEach(callback)
  }

  #get(x, y) { 
    return this.array2D.get(x - 1, y - 1)
  }

  #set(x, y, value) { 
    this.array2D.set(x - 1, y - 1, value)
  }

  #findIndex(value) {
    const index = this.array2D.findIndex(value)

    if (index === -1) return -1

    return {
      x: index.x + 1,
      y: index.y + 1
    }
  }
}