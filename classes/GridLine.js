export default class GridLine {
  constructor({start, end}) {
    this.start = start
    this.end = end

    // maybe change to segment class?
  }

  get() {
    return {
      start: this.start,
      end: this.end
    }
  }
}