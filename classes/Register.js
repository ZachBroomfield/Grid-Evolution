import Array2D from "./Array2D"

export default class Register {
  constructor({height, width}) {
    this.multiDimArr = new Array2D(width, height)
    this.currentFrame = 0
  }

  updateRegister(object) {
    this.#updateRegister(object)
  }
  
  getObjectAt(x, y) {
    if (this.objectExistsAt(x - 1, y - 1)) {
      return this.multiDimArr.get(x - 1, y - 1)
    }
    
    return null
  }

  getTypeAt(x, y) {
    const object = this.getObjectAt(x, y)

    if (object instanceof "LifeForm") {
      return "Life"
    }

    return null
  }

  objectExistsAt(x, y) {
    return this.multiDimArr.valueExistsAt(x - 1, y - 1)
  }

  validMove(x, y) {
    return (this.#validCoordinates(x, y) && !this.objectExistsAt(x, y))
  }

  eachObject(callback) {
    this.multiDimArr.forEachObject(callback)
  }

  drawObjects(ctx) {
    this.multiDimArr.forEachObject(object => {
      if (object != null) {
        object.draw(ctx)
      }
    })
  }

  incrementFrame() {
    this.currentFrame += 1
  }

  getCurrentFrame() {
    return this.currentFrame
  }

  #updateRegister(object) {
    const oldCoords = this.multiDimArr.findIndex(object)
    const coords = object.coordinates

    if (oldCoords != -1) {
      if (oldCoords.x + 1 == coords.x && oldCoords.y + 1 == coords.y) {
        return
      }

      this.multiDimArr.set(oldCoords.x, oldCoords.y, null)
    }
    this.multiDimArr.set(coords.x - 1, coords.y - 1, object)
  }

  #validCoordinates(x, y) {
    return this.multiDimArr.validPosition(x - 1, y - 1)
  }
}