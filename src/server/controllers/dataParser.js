const dataParser = {
  /* Node Parser */
  nodesParser: (nodes) => {
    const nodeArray = [];
    const { items } = nodes;

    for (let i = 0; i < items.length; i++) {
      const node = items[i];

      //node condition filter
      const conditionsArray = node['status']['conditions'];
      const conditionsObj = {};
      conditionsArray.forEach((condition) => {
        conditionsObj[condition['type']] = {
          status: condition['status'],
          message: condition['message'],
        };
      });

      //node object
      const nodeObj = {
        kind: 'Node',
        name: node['metadata']['name'],
        uid: node['metadata']['uid'],
        creationTimestamp: node['metadata']['creationTimestamp'],
        conditions: conditionsObj,
      };

      nodeArray.push(nodeObj);
    }
    return nodeArray;
  },

  /* Pod Parser */
  podsParser: (pods) => {
    const podArray = [];
    const { items } = pods;

    for (let i = 0; i < items.length; i++) {
      const pod = items[i];

      //pod label filter
      const labelObj = pod['metadata']['labels'];
      const labelFilter = {};
      for (let key in labelObj) {
        const keyWithoutPeriods = key.replace(/\./g, '%2E');
        labelFilter[keyWithoutPeriods] = labelObj[key];
      }

      //pod container filter
      const containerArray = [];
      const containers = pod['spec']['containers'];
      const containerStatuses = pod['status']['containerStatuses'];
      for (let i = 0; i < containers.length; i++) {
        const containerObj = {
          name: containers[i]['name'],
          image: containers[i]['image'],
          ready: containerStatuses[i]['ready'],
          restartCount: containerStatuses[i]['restartCount'],
          started: containerStatuses[i]['started'],
          startedAt: containerStatuses[i]['state']['running']['startedAt'],
        };
        containerArray.push(containerObj);
      }

      //pod condition filter
      const conditionsArray = pod['status']['conditions'];
      const conditionsObj = {};
      conditionsArray.forEach((condition) => {
        conditionsObj[condition['type']] = condition['status'];
      });

      //pod object
      const podObj = {
        kind: 'Pod',
        name: pod['metadata']['name'],
        namespace: pod['metadata']['namespace'],
        uid: pod['metadata']['uid'],
        creationTimestamp: pod['metadata']['creationTimestamp'],
        labels: labelFilter,
        containers: containerArray,
        nodeName: pod['spec']['nodeName'],
        status: pod['status']['phase'],
        conditions: conditionsObj,
      };

      podArray.push(podObj);
    }
    return podArray;
  },

  /* Service Parser */
  servicesParser: (services) => {
    const serviceArray = [];
    const { items } = services;

    for (let i = 0; i < items.length; i++) {
      const service = items[i];

      //service object
      const serviceObj = {
        kind: 'Service',
        name: service['metadata']['name'],
        namespace: service['metadata']['namespace'],
        uid: service['metadata']['uid'],
        creationTimestamp: service['metadata']['creationTimestamp'],
        clusterIPs: service['spec']['clusterIPs'],
        selector: service['spec']['selector']
          ? service['spec']['selector']
          : 'NA',
        type: service['spec']['type'] ? service['spec']['type'] : 'NA',
      };

      serviceArray.push(serviceObj);
    }
    return serviceArray;
  },
};

module.exports = dataParser;
