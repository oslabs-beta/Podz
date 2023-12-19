import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const Schema = mongoose.Schema;
const myURI = 'mongodb+srv://podz:Codesmith@cluster0.26b71cr.mongodb.net/?retryWrites=true&w=majority'
// const URI = process.env.MONGO_URI || myURI;

// mongoose
//   .connect(myURI, {
//     dbName: 'Cluster0'
//   })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch((err) => console.log(err));

mongoose.connect(myURI, {
dbName: 'Cluster0'
});
// this is an event listening to open
  mongoose.connection.once('open', () => {
  console.log('--------------------------------------------------------Connected to Database-------------------------------------------------------');
});


const nodeSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  conditions: { type: Object, required: true },
});

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
})

const serviceSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  clusterIPs: { type: Array, required: true },
  selector: { type: Object },
  type: { type: String, required: true },
})

const namespaceSchema = new Schema({
  kind: { type: String, required: true },
  name: { type: String, required: true },
  uid: { type: String, required: true },
  creationTimestamp: { type: String, required: true },
  status: { type: Object, required: true },
})

const containerSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ready: { type: String, required: true },
  restartCount: { type: String, required: true },
  started: { type: String, required: true },
  startedAt: { type: String, required: true},
})

export const Node = mongoose.model('node', nodeSchema);
export const Pod = mongoose.model('pod', podSchema);
export const Service = mongoose.model('service', serviceSchema);
export const Namespace = mongoose.model('namespace', namespaceSchema);
export const Container = mongoose.model('container', containerSchema);

// export default { Node, Pod, Service, Namespace }
