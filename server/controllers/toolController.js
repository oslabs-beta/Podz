const dataParser = require('./dataParser.js');
const { Node, Pod, Service } = require('../models/toolModel.js');

const { nodesParser, podsParser, servicesParser } = dataParser;

const toolController = {};

toolController.postNodes = async (req, res, next) => {
  try {
    //Fetches and parses data
    const response = await fetch('http://localhost:8083/api/v1/nodes');
    const data = await response.json();
    const parsedDataArray = nodesParser(data);
    console.log(
      '-------------------------',
      parsedDataArray,
      '-------------------------------'
    );

    //Uploads to database and persists through res.locals
    const nodesData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const { kind, name, uid, creationTimestamp, conditions } =
        parsedDataArray[i];
      const newNode = await Node.create({
        kind,
        name,
        uid,
        creationTimestamp,
        conditions,
      });
      //   console.log('new node', newNode);
      nodesData.push(newNode);
    }
    res.locals.nodesData = nodesData;
    return next();
  } catch (error) {
    return next(error);
  }
};

toolController.postPods = async (req, res, next) => {
  try {
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
      //   console.log('new pod', newPod);
      podsData.push(newPod);
    }
    res.locals.podsData = podsData;
    return next();
  } catch (error) {
    console.log('Error: In getPods middleware', error);
  }
};

toolController.postServices = async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8083/api/v1/services');
    const data = await response.json();
    const parsedData = servicesParser(data);

    const servicesData = [];
    for (let i = 0; i < parsedDataArray.length; i++) {
      const { kind, name, uid, creationTimestamp, conditions } =
        parsedDataArray[i];
      const newService = await Service.create({
        kind,
        name,
        uid,
        creationTimestamp,
        clusterIPs,
        selector,
        type,
      });
      console.log('new Service', newService);
      servicesData.push(newService);
    }
    res.locals.servicesData = servicesData;
    return next();
  } catch (error) {
    console.log('Error: In getServices middleware', error);
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

module.exports = toolController;
