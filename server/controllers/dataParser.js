const dataParser = {};

/* Node Parser */
dataParser.nodesParser = (nodes) => {
  //Filters through desired conditions data;
  const conditionsFilter = (node) => {
    const resultObj = {};
    const conditions = node['status']['conditions'];
    for (let i = 0; i < conditions.length; i++) {
      // resultObj[conditions[i]["type"]] = conditions[i]["type"]
      const newObj = {};
      newObj.status = conditions[i]['status'];
      newObj.message = conditions[i]['message'];
      resultObj[conditions[i]['type']] = newObj;
    }
    return resultObj;
  };

  //Grabs type in conditions that's status equates to "True"
  // const statusCheck = (node) => {
  //   const conditions = node["status"]["conditions"]
  //   for (let i = 0; i < conditions.length; i++){
  //     if (conditions[i]["status"] === 'True'){
  //       return conditions[i]["type"]
  //     }
  //   }
  // }

  const { items } = nodes;
  const newArray = [];
  for (let i = 0; i < items.length; i++) {
    const newObj = {};
    const node = items[i];
    newObj.kind = 'Node';
    newObj.name = node['metadata']['name'];
    newObj.uid = node['metadata']['uid'];
    newObj.creationTimestamp = node['metadata']['creationTimestamp'];
    newObj.conditions = conditionsFilter(node);

    // Optional data commented out:
    // newObj.status = statusCheck(node)
    // newObj.images = node["status"]["images"]
    newArray.push(newObj);
  }
  return newArray;
};

/* Pod Parser */
dataParser.podsParser = (pods) => {
  //Filters through desired conditions data;
  const conditionsFilter = (pod) => {
    const resultObj = {};
    const conditions = pod['status']['conditions'];
    for (let i = 0; i < conditions.length; i++) {
      // resultObj[conditions[i]["type"]] = conditions[i]["type"]
      // const newObj = {};
      // newObj.status = conditions[i]["status"]
      // newObj.message = conditions[i]["message"]
      // resultObj[conditions[i]["type"]] = newObj
      resultObj[conditions[i]['type']] = conditions[i]['status'];
    }
    return resultObj;
  };

  const containerFilter = (pod) => {
    const resultArray = [];
    const containers = pod['spec']['containers'];
    const containerStatuses = pod['status']['containerStatuses'];

    for (let i = 0; i < containers.length; i++) {
      const newObj = {};
      newObj.name = containers[i]['name'];
      newObj.image = containers[i]['image'];
      newObj.ready = containerStatuses[i]['ready'];
      newObj.restartCount = containerStatuses[i]['restartCount'];
      newObj.started = containerStatuses[i]['started'];
      newObj.startedAt = containerStatuses[i]['state']['running']['startedAt'];
      resultArray.push(newObj);
      // resultObj[containers[i]["name"]] = newObj
    }
    return resultArray;
  };

  const labelFilter = (pod) => {
    const resultArray = [];
    for (let key in pod) {
      resultArray.push({ key: pod[key] });
    }
    return resultArray;
  };

  const { items } = pods;
  const newArray = [];
  for (let i = 0; i < items.length; i++) {
    const newObj = {};
    const pod = items[i];
    newObj.kind = 'Pod';
    newObj.name = pod['metadata']['name'];
    newObj.namespace = pod['metadata']['namespace'];
    newObj.uid = pod['metadata']['uid'];
    newObj.creationTimestamp = pod['metadata']['creationTimestamp'];
    newObj.labels = labelFilter(pod['metadata']['labels']);
    newObj.containers = containerFilter(pod);
    newObj.nodeName = pod['spec']['nodeName'];
    newObj.status = pod['status']['phase'];
    newObj.conditions = conditionsFilter(pod);
    // newObj.conditions = conditionsFilter(node)
    // newObj.status = statusCheck(node)
    // newObj.images = node["status"]["images"]
    newArray.push(newObj);
  }
  return newArray;
};

/* Service Parser */
dataParser.servicesParser = (service) => {
  const newArray = [];


  service.items.forEach((ele) => {
    const newObj = {};
    newObj.kind = 'Service';
    newObj.name = ele.metadata.name;
    newObj.namespace = ele.metadata.namespace;
    newObj.uid = ele.metadata.uid;
    newObj.creationTimestamp = ele.metadata.creationTimestamp;
    newObj.clusterIPs = ele.spec.clusterIPs;
    if (ele.spec.selector) newObj.selector = ele.spec.selector;
    newObj.type = ele.spec.type;
    newArray.push(newObj);
  });
  return newArray;
};

// dataParsers.namespacesParser = (obj) => {
//   const newArray = [];

//   obj.items.forEach((ele) => {
//     const newObj = {};
//     newObj.kind = 'Namespace';
//     newObj.name = ele.metadata.name;
//     newObj.uid = ele.metadata.uid;
//     newObj.creationTimestamp = ele.metadata.creationTimestamp;
//     newObj.status = ele.status;
//     newArray.push(newObj);
//   });
//   return newArray;
// };

module.exports = dataParser;
