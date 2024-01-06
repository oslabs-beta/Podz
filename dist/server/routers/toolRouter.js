import path from 'path';
import express from 'express';
import toolController from '../controllers/toolController.js';
const { addSnapshotTime, postNodes, postPods, postContainers, postServices, clusterData, } = toolController;
const router = express.Router();
router.use(express.static(path.resolve(__dirname, '../../build')));
router.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
router.get('/data', addSnapshotTime, postNodes, postPods, postContainers, postServices, clusterData, (req, res) => {
    return res.status(200).json(res.locals.clusterData);
});
// router.get('/data', (req: Request, res: Response) => {
// })
export default router;
