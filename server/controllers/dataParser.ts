import {
  NodeType,
  PodType,
  ContainerType,
  ServiceType,
  dataParserType,
} from '../../types';

const dataParser: dataParserType = {
  /* Node Parser */
  nodesParser: (nodes: any) => {
    const nodeArray: NodeType[] = [];
    const { items } = nodes;

    for (let i = 0; i < items.length; i++) {
      const node = items[i];

      //node condition filter
      const conditionsArray = node['status']['conditions'];
      const conditionsObj: any = {};
      conditionsArray.forEach((condition: any) => {
        conditionsObj[condition['type']] = {
          status: condition['status'],
          message: condition['message'],
        };
      });

      //node object
      const nodeObj: NodeType = {
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
  podsParser: (pods: any) => {
    const podArray: PodType[] = [];
    const { items } = pods;

    for (let i = 0; i < items.length; i++) {
      const pod = items[i];

      //pod label filter
      const labelObj = pod['metadata']['labels'];
      const labelFilter: any = {};
      for (let key in labelObj) {
        const keyWithoutPeriods = key.replace(/\./g, '%2E');
        labelFilter[keyWithoutPeriods] = labelObj[key];
      }

      //pod container filter
      const containerArray: ContainerType[] = [];
      const containers = pod['spec']['containers'];
      const containerStatuses = pod['status']['containerStatuses'];
      for (let i = 0; i < containers.length; i++) {
        const containerObj: ContainerType = {
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
      const conditionsObj: any = {};
      conditionsArray.forEach((condition: any) => {
        conditionsObj[condition['type']] = condition['status'];
      });

      //pod object
      const podObj: PodType = {
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
  servicesParser: (services: any) => {
    const serviceArray: ServiceType[] = [];
    const { items } = services;

    for (let i = 0; i < items.length; i++) {
      const service = items[i];
      //service object
      const serviceObj: ServiceType = {
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

export default dataParser;
