const dataParser = {};

/* Node Parser */
dataParser.nodesParser = (nodes) => {
  //Filters through desired conditions data;
  const conditionsFilter = (node) => {
    const resultObj = {};

    //helper function
    const conditions = node['status']['conditions'];
    for (let i = 0; i < conditions.length; i++) {
      const newObj = {};
      newObj.status = conditions[i]['status'];
      newObj.message = conditions[i]['message'];
      resultObj[conditions[i]['type']] = newObj;
    }
    return resultObj;
  };

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
    }
    return resultArray;
  };

  const labelFilter = (pod) => {
    const resultObj = {};
    for (let key in pod) {
      const keyWithoutPeriods = key.replace(/\./g, '%2E');
      resultObj[keyWithoutPeriods] = pod[key];
    }
    return resultObj;
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
    newArray.push(newObj);
  }
  return newArray;
};

/* Service Parser */
dataParser.servicesParser = (service) => {
  const newArray = [];

  for (let i = 0; i < service.items.length; i++) {
    const ele = service.items[i];
    const newObj = {};
    newObj.kind = 'Service';
    newObj.name = ele.metadata.name;
    newObj.namespace = ele.metadata.namespace;
    newObj.uid = ele.metadata.uid;
    newObj.creationTimestamp = ele.metadata.creationTimestamp;
    newObj.clusterIPs = ele.spec.clusterIPs;
    if (!ele.spec.selector) {
      continue;
    }
    newObj.selector = ele.spec.selector;
    newObj.type = ele.spec.type;
    newArray.push(newObj);
  }
  return newArray;
};

module.exports = dataParser;
