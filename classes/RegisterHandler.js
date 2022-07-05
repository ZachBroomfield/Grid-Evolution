import Register from "./Register.js"
import Food from "./Food.js"

export default class RegisterHandler {
  constructor({width, height}) {
    this.register = new Register({width, height})
    this.currentFrame = 0

    this.ages = []
  }

  incrementFrame() {
    this.currentFrame += 1
  }

  getCurrentFrame() {
    return this.currentFrame
  }

  update(obj) {
    this.#update(obj)
  }

  remove(obj) {
    this.#remove(obj)
  }

  eachObject(callback) {
    this.register.forEach(callback)
  }

  validMove({x, y}) {
    return this.#validMove(x, y)
  }

  getObjectAt(x, y) {
    return this.register.get(x, y)
  }

  addAge(age) {
    this.ages.push(age)
    if (this.ages.length > 100) this.ages.shift()
  }

  averageAge() {
    if (this.ages.length === 0) return 0
    return this.ages.reduce((total, num) => {
      return total + num
    }) / this.ages.length
  }

  #remove(obj) {
    const index = this.register.findIndex(obj)
    if (index !== -1) {
      this.register.set(index.x, index.y, null)
    }
  }

  #validMove(x, y) {
    const currentValue = this.register.get(x, y)

    if (currentValue === undefined) return false

    return currentValue === null || currentValue.getType() === "Food"
  }

  #update(obj) {
    const oldCoords = this.register.findIndex(obj)
    const newCoords = obj.coordinates

    if (oldCoords !== -1) {
      if (oldCoords.x === newCoords.x && oldCoords.y === newCoords.y) {
        return
      }

      this.register.set(oldCoords.x, oldCoords.y, null)
    }

    const currObjAtNewCoords = this.register.get(newCoords.x, newCoords.y)

    if (currObjAtNewCoords) {
      obj.eat(currObjAtNewCoords.getEnergy())
    }

    this.register.set(newCoords.x, newCoords.y, obj)

    // if (this.register.valueExistsAt(newCoords.x, newCoords.y)){}
    // const currentObjAtCoords = this.getObjectAt(newCoords.x, newCoords.y)

    // if (currentObjAtCoords) {
    //   obj.eat(currentObjAtCoords.getEnergy())
    // }
    // this.register.set(obj)
  }
























  // update below
  // getObjectAt(x, y) {
  //   if (this.objectExistsAt(x, y)) {
  //     return this.#get(x, y)
  //   }
    
  //   return null
  // }

  // getTypeAt(x, y) {
  //   const obj = this.getObjectAt(x, y)

  //   if (obj == null) return null

  //   return obj.getType()
  // }

  // doesObjectExist(x, y) { //good
  //   return this.register.get(x, y) != null
  // }

  // validMove(x, y) {
  //   if (!this.#validCoordinates(x, y)) return false

  //   if (!this.objectExistsAt(x, y) || this.getTypeAt(x, y) === "Food") return true

  //   return false    
  // }

  

  


}