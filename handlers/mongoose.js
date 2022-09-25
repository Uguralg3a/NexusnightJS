const { mongo } = require('../config.json')
const mongoose = require("mongoose")

module.exports = async () => {
  if (!mongo) return

  await mongoose.connect(mongo, {
    useUnifiedTopology: true
  }).then(console.log('connected to the database'))
}