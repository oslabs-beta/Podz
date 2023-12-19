const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const nodeSchema = new Schema({});

const Node = mongoose.model('node', nodeSchema);

const serviceSchema = new Schema({});

const Service = mongoose.model('service', serviceSchema);

/*
const usefulData = (obj) => {
  const result = []
  // for (let i = 0; i < obj.items.length; i++) {

  // }
  obj.items.forEach(ele => {
    const node = {}
    node.kind = obj.kind;
    node.name = ele.metadata.name;
    node.uid = ele.metadata.uid;
    node.creationTimestamp = ele.metadata.creationTimestamp;
    node.clusterIPs = ele.spec.clusterIPs;
    if (ele.spec.selector) node.selector = ele.spec.selector
    node.type = ele.spec.type
    result.push(node)
  })
  return result;
}
console.log(usefulData(serviceObject));
*/


module.exports = { Node };
