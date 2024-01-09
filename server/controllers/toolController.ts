import { Request, Response, NextFunction } from 'express';
import { Node, Pod, Container, Service } from '../models/toolModel.js';
import {
  NodeSnap,
  PodSnap,
  ContainerSnap,
  ServiceSnap,
  toolControllerType,
} from '../../types';
import dataParser from './dataParser.js';
const { nodesParser, podsParser, servicesParser } = dataParser;

let apiPort = 10000;

const toolController: toolControllerType = {
  setPort: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userPort = Number(req.body.portNumber);

      if (userPort) {
        apiPort = userPort;
      }

      return next();
    } catch (error) {
      console.log('Error: In setPort middleware', error);
    }
  },

  addSnapshotTime: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.snapshot = Date.now();

      return next();
    } catch (error) {
      console.log('Error: In addSnapshotTime middleware', error);
    }
  },

  postNodes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshot }: Record<any, Number> = res.locals;
      //Fetches and parses data
      const response = await fetch(`http://localhost:${apiPort}/api/v1/nodes`);
      const data = await response.json();
      const parsedDataArray = nodesParser(data);

      //Uploads to database and persists through res.locals
      const nodesData: NodeSnap[] = [];
      for (let i = 0; i < parsedDataArray.length; i++) {
        const { kind, name, uid, creationTimestamp, conditions } =
          parsedDataArray[i];
        const newNode: any = await Node.create({
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
  },

  postPods: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshot }: Record<any, Number> = res.locals;
      const response = await fetch(`http://localhost:${apiPort}/api/v1/pods`);
      const data = await response.json();
      const parsedDataArray = podsParser(data);

      const podsData: PodSnap[] = [];
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
        const newPod: any = await Pod.create({
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
  },

  postContainers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshot }: Record<any, Number> = res.locals;
      const podsData: PodSnap[] = res.locals.podsData;

      const containersData: ContainerSnap[] = [];
      for (let i = 0; i < podsData.length; i++) {
        for (let j = 0; j < podsData[i].containers.length; j++) {
          const { name, image, ready, restartCount, started, startedAt } =
            podsData[i]['containers'][j];
          const newContainer: any = await Container.create({
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
  },

  postServices: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshot }: Record<any, Number> = res.locals;
      const response = await fetch(
        `http://localhost:${apiPort}/api/v1/services`
      );
      const data = await response.json();
      const parsedDataArray = servicesParser(data);

      const servicesData: ServiceSnap[] = [];
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
        const newService: any = await Service.create({
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
  },

  clusterData: (req: Request, res: Response, next: NextFunction) => {
    const nodeArray: NodeSnap[] = res.locals.nodesData;
    const podArray: PodSnap[] = res.locals.podsData;
    const containerArray: ContainerSnap[] = res.locals.containersData;
    const serviceArray: ServiceSnap[] = res.locals.servicesData;

    const cluster = [...podArray, ...containerArray, ...serviceArray];
    const nameSpace = ['kube-system', 'kube-public', 'kube-node-lease'];

    const filterCluster = cluster.filter(
      (ele: any) => !nameSpace.includes(ele.namespace)
    );

    res.locals.clusterData = {
      data: [{ kind: 'MasterNode' }, ...nodeArray, ...filterCluster],
    };
    return next();
  },
};

export default toolController;
