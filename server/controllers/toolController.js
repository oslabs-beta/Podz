const { Node, Pod, Container, Service } = require('../models/toolModel.js');

const dataParser = require('./dataParser.js');
const { nodesParser, podsParser, servicesParser } = dataParser;

const toolController = {};

toolController.addSnapshotTime = async (req, res, next) => {
  try {
    res.locals.snapshot = Date.now();
    console.log('Snapshot time in milliseconds: ', res.locals.snapshot);
    return next();
  } catch (error) {
    console.log('Error: In addSnapshotTime middleware', error);
  }
};

toolController.postNodes = async (req, res, next) => {
  try {
    const { snapshot } = res.locals;

    //Fetches and parses data
    const response = await fetch('http://localhost:8083/api/v1/nodes');
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
    const response = await fetch('http://localhost:8083/api/v1/pods');
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
    const response = await fetch('http://localhost:8083/api/v1/services');
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
