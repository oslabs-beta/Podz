"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Container = exports.Pod = exports.Node = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(process.env.MONGO_URI, {
    dbName: 'ClusterData',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('Connected to Mongo DB.'); })
    .catch(function (error) { return console.log(error); });
var Schema = mongoose_1.default.Schema;
var nodeSchema = new Schema({
    snapshot: { type: Number, required: true },
    kind: { type: String, required: true },
    name: { type: String, required: true },
    uid: { type: String, required: true },
    creationTimestamp: { type: String, required: true },
    conditions: { type: Object, required: true },
});
var Node = mongoose_1.default.model('node', nodeSchema);
exports.Node = Node;
var podSchema = new Schema({
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
var Pod = mongoose_1.default.model('pod', podSchema);
exports.Pod = Pod;
var containerSchema = new Schema({
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
var Container = mongoose_1.default.model('container', containerSchema);
exports.Container = Container;
var serviceSchema = new Schema({
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
var Service = mongoose_1.default.model('service', serviceSchema);
exports.Service = Service;
