import express, { Request, Response } from 'express';
import { addDB } from '../models/toolModel.js';
import toolController from '../controllers/toolController.js';
const {
  setPort,
  addSnapshotTime,
  getSnapshot,
  getSnapshotTimeArray,
  postNodes,
  postPods,
  postContainers,
  postServices,
  clusterData,
  snapshotClusterData,
} = toolController;

const router = express.Router();

//send cluster data to D3
router.get(
  '/data',
  addSnapshotTime,
  postNodes,
  postPods,
  postContainers,
  postServices,
  clusterData,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clusterData);
  }
);

//setup MongoDB link and port number
router.post('/data', addDB, setPort, (req: Request, res: Response) => {
  return res.status(200).json('Info Added');
});

router.get(
  '/snapshot',
  getSnapshot,
  snapshotClusterData,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.snapshotClusterData);
  }
);

router.get(
  '/snapshot/list',
  getSnapshotTimeArray,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.snapshotTimeArray);
  }
);

export default router;
