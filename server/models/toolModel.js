const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const nodeSchema = new Schema({});

const Node = mongoose.model('node', nodeSchema);

module.exports = { Node };
