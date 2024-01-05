import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'ClusterData',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((error) => console.log(error));

const Schema = mongoose.Schema;

interface Node {
  snapshot: Number,
  kind: String,
  name: String,
  uid: String,
  creationTimestamp: String,
  conditions: Object
}

const nodeSchema = new Schema<Node>({
  snapshot: { type: Number, required: true },
  kind: { type: String, required: true },
  name: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  conditions: { type: Object, required: true },
});

const Node = mongoose.model<Node>('node', nodeSchema);

interface Pod extends Node {
  namespace: String,
  labels: Object,
  containers: Object,
  nodeName: String,
  status: String
}

const podSchema = new Schema({
  snapshot: { type: Number, required: true },
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

const Pod = mongoose.model<Pod>('pod', podSchema);

interface Container {
  snapshot: Number,
  kind: String,
  name: String,
  namespace: String,
  podName: String,
  image: String,
  ready: String,
  restartCount: String,
  started: Boolean,
  startedAt: String
}

const containerSchema = new Schema<Container>({
  snapshot: { type: Number, required: true },
  kind: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: true },
  podName: { type: String, required: true },
  image: { type: String, required: true },
  ready: { type: String, required: true },
  restartCount: { type: String, required: true },
  started: { type: Boolean, required: true },
  startedAt: { type: String, required: true },
});

const Container = mongoose.model<Container>('container', containerSchema);

interface Service {
  snapshot: Number,
  kind: String,
  name: String,
  namespace: String,
  uid: String,
  creationTimestamp: String,
  clusterIPs: [String],
  selector: Object,
  type: String,
}

const serviceSchema = new Schema<Service>({
  snapshot: { type: Number, required: true },
  kind: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  clusterIPs: { type: [String], required: true },
  selector: { type: Object, required: true },
  type: { type: String, required: true },
});

const Service = mongoose.model<Service>('service', serviceSchema);

// const namespaceSchema = new Schema({
//   snapshot: { type: Number, required: true },
//   kind: { type: String, required: true },
//   name: { type: String, required: true },
//   uid: { type: String, required: true },
//   creationTimestamp: { type: String, required: true },
//   status: { type: Object, required: true },
// });

export { Node, Pod, Container, Service };
