import { Request, Response, NextFunction } from 'express';
import {
  Node,
  Pod,
  Container,
  Service,
  SnapshotTime,
} from '../models/toolModel.js';
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
      const snapshotTime = Date.now();
      SnapshotTime.create({ snapshotTime });

      res.locals.snapshotTime = snapshotTime;
      return next();
    } catch (error) {
      console.log('Error: In addSnapshotTime middleware', error);
    }
  },

  getSnapshot: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshotTime } = req.query;
      const filter = Number(snapshotTime);

      const findSnapshot: (NodeSnap | PodSnap | ContainerSnap | ServiceSnap)[] =
        await SnapshotTime.aggregate([
          { $match: { snapshotTime: filter } },
          {
            $lookup: {
              from: 'nodes',
              localField: 'snapshotTime',
              foreignField: 'snapshotTime',
              as: 'nodes',
            },
          },
          {
            $lookup: {
              from: 'pods',
              localField: 'snapshotTime',
              foreignField: 'snapshotTime',
              as: 'pods',
            },
          },
          {
            $lookup: {
              from: 'containers',
              localField: 'snapshotTime',
              foreignField: 'snapshotTime',
              as: 'containers',
            },
          },
          {
            $lookup: {
              from: 'services',
              localField: 'snapshotTime',
              foreignField: 'snapshotTime',
              as: 'services',
            },
          },
        ]);

      res.locals.snapshot = findSnapshot;
      return next();
    } catch (error) {
      console.log('Error: In getSnapshot middleware', error);
    }
  },

  getSnapshotTimeArray: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { start, end } = req.query;

      const findSnapshotArray: { snapshotTime: Number }[] =
        await SnapshotTime.find({
          snapshotTime: { $gt: start, $lt: end },
        });

      res.locals.snapshotTimeArray = findSnapshotArray;
      return next();
    } catch (error) {
      console.log('Error: In getSnapshotTimeArray middleware', error);
    }
  },

  postNodes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { snapshotTime }: Record<any, Number> = res.locals;
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
          snapshotTime,
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
      const { snapshotTime }: Record<any, Number> = res.locals;
      //Fetches and parses data
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
          snapshotTime,
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
      const { snapshotTime }: Record<any, Number> = res.locals;
      const podsData: PodSnap[] = res.locals.podsData;

      const containersData: ContainerSnap[] = [];
      for (let i = 0; i < podsData.length; i++) {
        for (let j = 0; j < podsData[i].containers.length; j++) {
          const { name, image, ready, restartCount, started, startedAt } =
            podsData[i]['containers'][j];
          const newContainer: any = await Container.create({
            snapshotTime,
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
      const { snapshotTime }: Record<any, Number> = res.locals;
      //Fetches and parses data
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
        
        if (type === 'ClusterIP') continue;

        const newService: any = await Service.create({
          snapshotTime,
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

  snapshotClusterData: (req: Request, res: Response, next: NextFunction) => {
    const { nodes, pods, containers, services } = res.locals.snapshot[0];

    const cluster = [...pods, ...containers, ...services];
    const nameSpace = ['kube-system', 'kube-public', 'kube-node-lease'];

    const filterCluster = cluster.filter(
      (ele: any) => !nameSpace.includes(ele.namespace)
    );

    console.log(filterCluster);

    res.locals.snapshotClusterData = {
      data: [{ kind: 'MasterNode' }, ...nodes, ...filterCluster],
    };
    return next();
  },
};

export default toolController;
