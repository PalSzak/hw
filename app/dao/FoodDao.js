const DUMMY_DATA = [
  {
    name: 'aa',
    createdAt: '2012-02-09T02:27:16-05:00',
    thumbnailUrl: 'thumbnailUrlValue',
    image_url: 'imageUrlValue',
    taken_at: 'takenAtValue',
    tags: [
      'tagA',
      'tagB'
    ],
    user: {
      id: 386047,
      username: 'Lluisdeharo',
      firstname: 'Lluis ',
      lastname: 'de Haro Sanchez',
      city: 'Sabadell',
      country: 'Catalunya',
      fullname: 'Lluis de Haro Sanchez',
      userpic_url: 'http://acdn.500px.net/386047/f76ed05530afec6d1d0bd985b98a91ce0ce49049/1.jpg?0',
      upgrade_status: 0
    }
  },
  {
    name: 'bb',
    createdAt: '2012-02-09T02:27:16-05:00',
    thumbnailUrl: 'thumbnailUrlValue',
    image_url: 'imageUrlValue',
    taken_at: 'takenAtValue',
    tags: [
      'tagA',
      'tagB'
    ],
    user: {
      id: 386047,
      username: 'Lluisdeharo',
      firstname: 'Lluis ',
      lastname: 'de Haro Sanchez',
      city: 'Sabadell',
      country: 'Catalunya',
      fullname: 'Lluis de Haro Sanchez',
      userpic_url: 'http://acdn.500px.net/386047/f76ed05530afec6d1d0bd985b98a91ce0ce49049/1.jpg?0',
      upgrade_status: 0
    }
  }
]

module.exports = class FoodDao {
  constructor (db) {
    this.db = db
  }

  wipeOut () {
    // TODO
  }

  getAll () {
    // TODO
    return DUMMY_DATA
  }

  getRecent10 () {
    // TODO
    return DUMMY_DATA
  }

  storeIfNew (images) {
    console.log(JSON.stringify(images, null, 2))
  }
}
