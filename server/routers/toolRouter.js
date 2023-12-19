import path from 'path';
import express from 'express'
import toolController from '../controllers/toolController.js';
import toolMiddleware from '../middleware/toolMiddleware.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// const path = require('path');
// const express = require('express');
// const toolController = require('../controllers/toolController.js');
// const toolMiddleware = require('../middleware/toolMiddleware.js');
const { addTime } = toolMiddleware
const { getNodes, getPods, getServices, getNamespaces, getContainers, postNodes, postPods, postServices, postNamespaces, postContainers } = toolController;

const router = express.Router();

router.use(express.static(path.resolve(__dirname, '../../build')));

// router.get('/', (req, res) =>
//   res.sendFile(path.resolve(__dirname, '../../build/index.html'))
// );

// getPods, getServices, getNamespaces, getContainers, 
router.post('/snapshot', postNodes, postPods, (req, res) => {
  res.status(200).json(res.locals.nodesData);
  res.status(200).json(res.locals.podsData);
});

// router.post('/snapshot', addTime, postNodes, postPods, postServices, postNamespaces, postContainers, (req, res) => {
//   res.data(200);
// })

export default router;
