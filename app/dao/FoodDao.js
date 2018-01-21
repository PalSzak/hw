const mongodb = require('mongodb')

module.exports = class FoodDao {
  constructor (client, dbName) {
    this.client = client
    this.db = this.db = client.db(dbName)
  }

  dispose () {
    this.client.close()
  }

  wipeOut () {
    return this.db.collection('food').drop()
  }

  getAll () {
    return this.db.collection('food')
      .find().toArray()
  }

  getRecent10 () {
    return this.db.collection('food')
      .find({ $query: {}, $orderby: { created_at: -1 } })
      .limit(10).toArray()
  }

  storeIfNew (images) {
    images.forEach((image) => {
      this.db.collection('food').update(image, image, { upsert: true })
    })
  }

  static connectToDatabase (url) {
    return mongodb.MongoClient.connect(url, { autoReconnect: false })
  }
}
