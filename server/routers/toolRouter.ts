import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import { addDB } from '../models/toolModel.js';
import toolController from '../controllers/toolController.js';
const {
  setPort,
  addSnapshotTime,
  postNodes,
  postPods,
  postContainers,
  postServices,
  clusterData,
} = toolController;

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

router.post('/data', addDB, setPort, (req: Request, res: Response) => {
  return res.status(200).json('Info Added');
});

export default router;
