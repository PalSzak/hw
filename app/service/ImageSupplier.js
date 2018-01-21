const HOUR_IN_MILLIS = 60 * 60 * 1000

module.exports = class ImageSupplier {
  constructor (query, dao, timeOut = HOUR_IN_MILLIS) {
    this.query = query
    this.dao = dao
    this.job = setInterval(() => this.loadNewImagesToDB(), timeOut)
  }

  dispose () {
    clearTimeout(this.job)
  }

  async loadNewImagesToDB () {
    this.fetchImages()
      .then((results) => this.mapImages(results))
      .then((mappedImages) => this.dao.storeIfNew(mappedImages))
      .catch((e) => console.error('Error during image population', e))
  }

  mapImages (results) {
    return new Array(...results.photos)
      .filter(this.validateImage)
      .map(this.mapImage)
  }

  validateImage (image) {
    let valid =
      image.id &&
      image.name &&
      image.url &&
      image.images &&
      image.images[0] &&
      image.images[0].url &&
      image.created_at &&
      image.tags &&
      image.user &&
      image.user.id &&
      image.user.username

    if (!valid) {
      console.warn(`Invalid Image found: '${JSON.stringify(image)}'`)
    }
    return valid
  }

  mapImage (image) {
    let hwImage = {
      external_id: image.id,
      name: image.name,
      url: image.url,
      thumbnail_url: image.images[0].url,
      created_at: image.created_at,
      taken_at: image.taken_at,
      tags: image.tags,
      author_information: {
        user_id: image.user.id,
        username: image.user.username
      }
    }

    if (!hwImage.taken_at || hwImage.taken_at === hwImage.created_at) {
      delete hwImage.taken_at
    }

    return hwImage
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
