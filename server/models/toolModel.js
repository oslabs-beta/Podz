const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  conditions: { type: Object, required: true },
});

const Node = mongoose.model('node', nodeSchema);

const podSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  labels: { type: Object, required: true },
  containers: { type: Object, required: true },
  nodeName: { type: String, required: true },
  status: { type: String, required: true },
  conditions: { type: Object, required: true },
});

const Pod = mongoose.model('pod', podSchema);

const serviceSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  clusterIPs: { type: Array, required: true },
  selector: { type: Object, required: true },
  type: { type: String, required: true },
});

const Service = mongoose.model('service', serviceSchema);

// const namespaceSchema = new Schema({
//   kind: { type: String, required: true },
//   name: { type: String, required: true },
//   uid: { type: String, required: true },
//   creationTimestamp: { type: String, required: true },
//   status: { type: Object, required: true },
// });

module.exports = { Node, Pod, Service };
