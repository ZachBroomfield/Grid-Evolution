export default class GridLine {
  constructor({start, end}) {
    this.start = start
    this.end = end
  }

  get() {
    return {
      start: this.start,
      end: this.end
    }
  }
}