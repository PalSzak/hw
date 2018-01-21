const HOUR_IN_MILLIS = 60 * 60 * 1000

module.exports = class ImageSupplier {
  constructor (query, timeOut = HOUR_IN_MILLIS) {
    this.query = query
    this.job = setInterval(() => this.loadNewImagesToDB(), timeOut)
  }

  dispose () {
    clearTimeout(this.job)
  }

  async loadNewImagesToDB () {
    try {
      let results = await this.fetchImages()
      console.log('The result', typeof results)
    } catch (e) {
      // Something went wrong
    }
  }

  fetchImages () {
    return new Promise((resolve, reject) => {
      this.query((error, results) => {
        error && reject(error)
        resolve(results)
      })
    })
  }
}
