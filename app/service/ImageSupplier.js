const HOUR_IN_MILLIS = 60 * 60 * 1000

module.exports = class ImageSupplier {
  constructor (timeOut = HOUR_IN_MILLIS) {
    this.job = setInterval(() => this.fetchImages(), timeOut)
  }

  dispose () {
    clearTimeout(this.job)
  }

  fetchImages () {
    console.log('Dummy fetchImages running')
  }
}
