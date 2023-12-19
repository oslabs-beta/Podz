const dataParser = require('./dataParser.js');
const { Node, Pod, Container, Service } = require('../models/toolModel.js');

const { nodesParser, podsParser, servicesParser } = dataParser;

const toolController = {};

toolController.addSnapshotTime = (req, res, next) => {
  try {
    res.locals.snapshot = Date.now();
    console.log(res.locals.snapshot);
    return next();
  } catch (error) {
    console.log('Error: In addSnapshotTime middleware', error);
  }
};

toolController.postNodes = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;

    //Fetches and parses data
    const response = await fetch('http://localhost:10000/api/v1/nodes');
    const data = await response.json();
    const parsedDataArray = nodesParser(data);

    //Uploads to database and persists through res.locals
    const nodesData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const { kind, name, uid, creationTimestamp, conditions } =
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
    const response = await fetch('http://localhost:10000/api/v1/pods');
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

toolController.postContainers = (req, res, next) => {
  try {
    const { snapshot } = res.locals;
    const containersData = [];
    const podsData = res.locals.podsData;
    for (let i = 0; i < podsData.length; i++) {
      for (let j = 0; j < podsData[i].containers.length; j++) {
        console.log(
          '-------------------------',
          podsData[i]['containers'][j],
          '-------------------------------'
        );
        const { name, image, ready, restartCount, started, startedAt } =
          podsData[i]['containers'][j];
        const newContainer = Container.create({
          snapshot,
          name,
          image,
          ready,
          restartCount,
          started,
          startedAt,
        });
        console.log('new Container', newContainer);
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
    const response = await fetch('http://localhost:10000/api/v1/services');
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

// toolController.postNamespaces = async (req, res, next) => {
//   try {
//     const response = await fetch('http://localhost:8083/api/v1/namespaces');
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
//       console.log('new namespace', newNamespace);
//       namespacesData.push(newNamespace);
//     }
//     res.locals.namespacesData = namespacesData;
//     return next();
//   } catch (error) {
//     console.log('Error: In getNamespaces middleware', error);
//   }
// };

toolController.clusterData = (req, res, next) => {
  const nodeArray = res.locals.nodesData;
  const podArray = res.locals.podsData;
  const containerArray = res.locals.containersData;
  const serviceArray = res.locals.servicesData;

  res.locals.clusterData = {
    data: [...nodeArray, ...podArray, ...containerArray, ...serviceArray],
  };
};

module.exports = toolController;
