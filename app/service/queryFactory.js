const API500px = require('500px')

const CONFI_KEY_500PX_CONSUMER_KEY = '500px_consumer-key'

function produceFoodImageQuery (config) {
  let apiKey = config[CONFI_KEY_500PX_CONSUMER_KEY]

  if (typeof apiKey === 'undefined') {
    throw new Error(
      `Mandatory config parameter (${CONFI_KEY_500PX_CONSUMER_KEY}) missing!`)
  }

  let api500px = new API500px(apiKey)

  return api500px.photos.searchByTag.bind(
    api500px.photos,
    'food',
    {
      'sort': 'created_at',
      'rpp': '100',
      'tags': true
    })
}

module.exports = produceFoodImageQuery
