const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI =process.env.MONGOURI

const connectToMongo = () => {
  // mongoose
  //   .connect(mongoURI, () => {
  //     console.log('Connected To MongoDB Successfully')
  //   })
  //   .then(() => console.log('Database connected!'))
  //   .catch((err) => console.log(err))
 
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err))
}

module.exports = connectToMongo
