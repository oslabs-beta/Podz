const express = require('express');
const { addDB } = require('../models/toolModel.js');
const toolController = require('../controllers/toolController.js');
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
  (req, res) => {
    return res.status(200).json(res.locals.clusterData);
  }
);

//setup MongoDB link and port number
router.post('/data', addDB, setPort, (req, res) => {
  return res.status(200).json('Info Added');
});

router.get('/snapshot', getSnapshot, snapshotClusterData, (req, res) => {
  return res.status(200).json(res.locals.snapshotClusterData);
});

router.get('/snapshot/list', getSnapshotTimeArray, (req, res) => {
  return res.status(200).json(res.locals.snapshotTimeArray);
});

module.exports = router;
