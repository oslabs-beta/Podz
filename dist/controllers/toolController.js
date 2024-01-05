"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolModel_1 = require("../models/toolModel");
var dataParser_js_1 = __importDefault(require("./dataParser.js"));
var nodesParser = dataParser_js_1.default.nodesParser, podsParser = dataParser_js_1.default.podsParser, servicesParser = dataParser_js_1.default.servicesParser;
var toolController = {};
toolController.addSnapshotTime = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.locals.snapshot = Date.now();
            console.log('Snapshot time in milliseconds: ', res.locals.snapshot);
            return [2 /*return*/, next()];
        }
        catch (error) {
            console.log('Error: In addSnapshotTime middleware', error);
        }
        return [2 /*return*/];
    });
}); };
toolController.postNodes = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, response, data, parsedDataArray, nodesData, i, _a, kind, name_1, uid, creationTimestamp, conditions, newNode, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                snapshot = res.locals.snapshot;
                return [4 /*yield*/, fetch('http://localhost:8083/api/v1/nodes')];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _b.sent();
                parsedDataArray = nodesParser(data);
                nodesData = [];
                i = 0;
                _b.label = 3;
            case 3:
                if (!(i < parsedDataArray.length)) return [3 /*break*/, 6];
                _a = parsedDataArray[i], kind = _a.kind, name_1 = _a.name, uid = _a.uid, creationTimestamp = _a.creationTimestamp, conditions = _a.conditions;
                return [4 /*yield*/, toolModel_1.Node.create({
                        snapshot: snapshot,
                        kind: kind,
                        name: name_1,
                        uid: uid,
                        creationTimestamp: creationTimestamp,
                        conditions: conditions,
                    })];
            case 4:
                newNode = _b.sent();
                nodesData.push(newNode);
                _b.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                res.locals.nodesData = nodesData;
                return [2 /*return*/, next()];
            case 7:
                error_1 = _b.sent();
                console.log('Error: In postNodes middleware', error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
toolController.postPods = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, response, data, parsedDataArray, podsData, i, _a, kind, name_2, namespace, uid, creationTimestamp, labels, containers, nodeName, status_1, conditions, newPod, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                snapshot = res.locals.snapshot;
                return [4 /*yield*/, fetch('http://localhost:10000/api/v1/pods')];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _b.sent();
                parsedDataArray = podsParser(data);
                podsData = [];
                i = 0;
                _b.label = 3;
            case 3:
                if (!(i < parsedDataArray.length)) return [3 /*break*/, 6];
                _a = parsedDataArray[i], kind = _a.kind, name_2 = _a.name, namespace = _a.namespace, uid = _a.uid, creationTimestamp = _a.creationTimestamp, labels = _a.labels, containers = _a.containers, nodeName = _a.nodeName, status_1 = _a.status, conditions = _a.conditions;
                return [4 /*yield*/, toolModel_1.Pod.create({
                        snapshot: snapshot,
                        kind: kind,
                        name: name_2,
                        namespace: namespace,
                        uid: uid,
                        creationTimestamp: creationTimestamp,
                        labels: labels,
                        containers: containers,
                        nodeName: nodeName,
                        status: status_1,
                        conditions: conditions,
                    })];
            case 4:
                newPod = _b.sent();
                podsData.push(newPod);
                _b.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                res.locals.podsData = podsData;
                return [2 /*return*/, next()];
            case 7:
                error_2 = _b.sent();
                console.log('Error: In postPods middleware', error_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
toolController.postContainers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, podsData, containersData, i, j, _a, name_3, image, ready, restartCount, started, startedAt, newContainer, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                snapshot = res.locals.snapshot;
                podsData = res.locals.podsData;
                containersData = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < podsData.length)) return [3 /*break*/, 6];
                j = 0;
                _b.label = 2;
            case 2:
                if (!(j < podsData[i].containers.length)) return [3 /*break*/, 5];
                _a = podsData[i]['containers'][j], name_3 = _a.name, image = _a.image, ready = _a.ready, restartCount = _a.restartCount, started = _a.started, startedAt = _a.startedAt;
                return [4 /*yield*/, toolModel_1.Container.create({
                        snapshot: snapshot,
                        kind: 'Container',
                        name: name_3,
                        namespace: podsData[i].namespace,
                        podName: podsData[i].name,
                        labels: podsData[i].labels,
                        image: image,
                        ready: ready,
                        restartCount: restartCount,
                        started: started,
                        startedAt: startedAt,
                    })];
            case 3:
                newContainer = _b.sent();
                containersData.push(newContainer);
                _b.label = 4;
            case 4:
                j++;
                return [3 /*break*/, 2];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6:
                res.locals.containersData = containersData;
                return [2 /*return*/, next()];
            case 7:
                error_3 = _b.sent();
                console.log('Error: In postContainers middleware', error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
toolController.postServices = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, response, data, parsedDataArray, servicesData, i, _a, kind, name_4, namespace, uid, creationTimestamp, clusterIPs, selector, type, newService, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                snapshot = res.locals.snapshot;
                return [4 /*yield*/, fetch('http://localhost:10000/api/v1/services')];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _b.sent();
                parsedDataArray = servicesParser(data);
                servicesData = [];
                i = 0;
                _b.label = 3;
            case 3:
                if (!(i < parsedDataArray.length)) return [3 /*break*/, 6];
                _a = parsedDataArray[i], kind = _a.kind, name_4 = _a.name, namespace = _a.namespace, uid = _a.uid, creationTimestamp = _a.creationTimestamp, clusterIPs = _a.clusterIPs, selector = _a.selector, type = _a.type;
                return [4 /*yield*/, toolModel_1.Service.create({
                        snapshot: snapshot,
                        kind: kind,
                        name: name_4,
                        namespace: namespace,
                        uid: uid,
                        creationTimestamp: creationTimestamp,
                        clusterIPs: clusterIPs,
                        selector: selector,
                        type: type,
                    })];
            case 4:
                newService = _b.sent();
                servicesData.push(newService);
                _b.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                res.locals.servicesData = servicesData;
                return [2 /*return*/, next()];
            case 7:
                error_4 = _b.sent();
                console.log('Error: In postServices middleware', error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// toolController.postNamespaces = async (req, res, next) => {
//   try {
//     const response = await fetch('http://localhost:10000/api/v1/namespaces');
//     const data = await response.json();
//     const parsedDataArray = namespacesParser(data);
//     const namespacesData = [];
//     for (let i = 0; i < parsedDataArray.length; i++) {
//       const { kind, name, uid, creationTimestamp, conditions } =
//         parsedDataArray[i];
//       const newNamespace = await Namespace.create({
//         kind,
//         name,
//         uid,
//         creationTimestamp,
//         conditions,
//       });
//       namespacesData.push(newNamespace);
//     }
//     res.locals.namespacesData = namespacesData;
//     return next();
//   } catch (error) {
//     console.log('Error: In getNamespaces middleware', error);
//   }
// };
toolController.clusterData = function (req, res, next) {
    var nodeArray = res.locals.nodesData;
    var podArray = res.locals.podsData;
    var containerArray = res.locals.containersData;
    var serviceArray = res.locals.servicesData;
    var cluster = __spreadArray(__spreadArray(__spreadArray([], podArray, true), containerArray, true), serviceArray, true);
    var nameSpace = ['kube-system', 'kube-public', 'kube-node-lease'];
    var filterCluster = cluster.filter(function (ele) { return !nameSpace.includes(ele.namespace); });
    res.locals.clusterData = {
        data: __spreadArray(__spreadArray([{ kind: 'MasterNode' }], nodeArray, true), filterCluster, true),
    };
    return next();
};
exports.default = toolController;
