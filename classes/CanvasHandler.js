export default class CanvasHandler {
  constructor({height = window.innerHeight, width = window.innerWidth, id}) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')

    this.#setCanvasSize(height, width)
  }

  getCtx() {
    return this.ctx
  }

  getMidPoint() {
    return {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }
  }

  getDimensions() {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  #setCanvasSize(height, width) {
    this.canvas.height = height
    this.canvas.width = width
  }
}