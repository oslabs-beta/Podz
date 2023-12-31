const { Node, Pod, Container, Service } = require('../models/toolModel.js');

const dataParser = require('./dataParser.js');
const { nodesParser, podsParser, servicesParser } = dataParser;

let apiPort = 10000;

const toolController = {};

toolController.setPort = async (req, res, next) => {
  try {
    let userPort = Number(req.body.portNumber);
    if (userPort) {
      apiPort = userPort;
    }
    return next();
  } catch (error) {
    console.log('Error: In setPort middleware', error);
  }
};

toolController.addSnapshotTime = async (req, res, next) => {
  try {
    res.locals.snapshot = Date.now();

    return next();
  } catch (error) {
    console.log('Error: In addSnapshotTime middleware', error);
  }
};

toolController.postNodes = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;

    //Fetches and parses data
    const response = await fetch(`http://localhost:${apiPort}/api/v1/nodes`);
    const data = await response.json();
    const parsedDataArray = nodesParser(data);
    //Uploads to database and persists through res.locals
    const nodesData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const { kind, name, uid, creationTimestamp, conditions, namespace } =
        parsedDataArray[i];
      const newNode = await Node.create({
        snapshot,
        kind,
        name,
        uid,
        creationTimestamp,
        conditions,
      });
      nodesData.push(newNode);
    }
    res.locals.nodesData = nodesData;
    return next();
  } catch (error) {
    console.log('Error: In postNodes middleware', error);
  }
};

toolController.postPods = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;
    const response = await fetch(`http://localhost:${apiPort}/api/v1/pods`);
    const data = await response.json();
    const parsedDataArray = podsParser(data);

    const podsData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const {
        kind,
        name,
        namespace,
        uid,
        creationTimestamp,
        labels,
        containers,
        nodeName,
        status,
        conditions,
      } = parsedDataArray[i];
      const newPod = await Pod.create({
        snapshot,
        kind,
        name,
        namespace,
        uid,
        creationTimestamp,
        labels,
        containers,
        nodeName,
        status,
        conditions,
      });
      podsData.push(newPod);
    }
    res.locals.podsData = podsData;
    return next();
  } catch (error) {
    console.log('Error: In postPods middleware', error);
  }
};

toolController.postContainers = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;

    const podsData = res.locals.podsData;
    const containersData = [];
    for (let i = 0; i < podsData.length; i++) {
      for (let j = 0; j < podsData[i].containers.length; j++) {
        const { name, image, ready, restartCount, started, startedAt } =
          podsData[i]['containers'][j];

        const newContainer = await Container.create({
          snapshot,
          kind: 'Container',
          name,
          namespace: podsData[i].namespace,
          podName: podsData[i].name,
          labels: podsData[i].labels,
          image,
          ready,
          restartCount,
          started,
          startedAt,
        });
        containersData.push(newContainer);
      }
    }

    res.locals.containersData = containersData;
    return next();
  } catch (error) {
    console.log('Error: In postContainers middleware', error);
  }
};

toolController.postServices = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;
    const response = await fetch(`http://localhost:${apiPort}/api/v1/services`);
    const data = await response.json();
    const parsedDataArray = servicesParser(data);

    const servicesData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const {
        kind,
        name,
        namespace,
        uid,
        creationTimestamp,
        clusterIPs,
        selector,
        type,
      } = parsedDataArray[i];
      const newService = await Service.create({
        snapshot,
        kind,
        name,
        namespace,
        uid,
        creationTimestamp,
        clusterIPs,
        selector,
        type,
      });
      servicesData.push(newService);
    }
    res.locals.servicesData = servicesData;
    return next();
  } catch (error) {
    console.log('Error: In postServices middleware', error);
  }
};

toolController.clusterData = (req, res, next) => {
  const nodeArray = res.locals.nodesData;
  const podArray = res.locals.podsData;
  const containerArray = res.locals.containersData;
  const serviceArray = res.locals.servicesData;

  const cluster = [...podArray, ...containerArray, ...serviceArray];
  const nameSpace = ['kube-system', 'kube-public', 'kube-node-lease'];

  const filterCluster = cluster.filter(
    (ele) => !nameSpace.includes(ele.namespace)
  );

  res.locals.clusterData = {
    data: [{ kind: 'MasterNode' }, ...nodeArray, ...filterCluster],
  };
  return next();
};

module.exports = toolController;
