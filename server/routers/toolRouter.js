const path = require('path');
const express = require('express');

const { addDB } = require('../models/toolModel.js');
const toolController = require('../controllers/toolController.js');

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

router.use(express.static(path.resolve(__dirname, '../../build')));

router.get('/', (req, res) =>
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
  (req, res) => {
    return res.status(200).json(res.locals.clusterData);
  }
);

router.post('/data', addDB, setPort, (req, res) => {
  return res.status(200).json('Info Added');
});

module.exports = router;
