import path from 'path'
import express, { Request, Response } from 'express'
import toolController from '../controllers/toolController'

const {
  addSnapshotTime,
  postNodes,
  postPods,
  postContainers,
  postServices,
  clusterData,
} = toolController;

const router = express.Router();

router.use(express.static(path.resolve(__dirname, '../../build')));

router.get('/', (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);

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

// router.get('/data', (req: Request, res: Response) => {
  
// })
export default router;
