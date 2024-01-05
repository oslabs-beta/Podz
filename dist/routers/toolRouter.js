"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var toolController_1 = __importDefault(require("../controllers/toolController"));
var addSnapshotTime = toolController_1.default.addSnapshotTime, postNodes = toolController_1.default.postNodes, postPods = toolController_1.default.postPods, postContainers = toolController_1.default.postContainers, postServices = toolController_1.default.postServices, clusterData = toolController_1.default.clusterData;
var router = express_1.default.Router();
router.use(express_1.default.static(path_1.default.resolve(__dirname, '../../build')));
router.get('/', function (req, res) {
    return res.sendFile(path_1.default.resolve(__dirname, '../build/index.html'));
});
router.get('/data', addSnapshotTime, postNodes, postPods, postContainers, postServices, clusterData, function (req, res) {
    return res.status(200).json(res.locals.clusterData);
});
// router.get('/data', (req: Request, res: Response) => {
// })
exports.default = router;
