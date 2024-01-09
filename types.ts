//frontend types
export interface ToolFormProps {
  inputStatus(): void;
}

export interface ToolMetricProps {
  nodeData: any;
}

export interface ToolTreeProps {
  setToolMetric: any;
  clusterData: {
    data: (
      | NodeSnap
      | PodSnap
      | ContainerSnap
      | ServiceSnap
      | { kind: String }
    )[];
  };
}

//backend types
import { RequestHandler } from 'express';

export interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}

export interface NodeType {
  kind: String;
  name: String;
  uid: String;
  creationTimestamp: String;
  conditions: Object;
}

export interface NodeSnap extends NodeType {
  snapshot: Number;
}

export interface PodType {
  kind: String;
  name: String;
  namespace: String;
  uid: String;
  creationTimestamp: String;
  labels: Object;
  containers: ContainerType[];
  nodeName: String;
  status: String;
  conditions: Object;
}

export interface PodSnap extends PodType {
  snapshot: Number;
}

export interface ContainerType {
  name: String;
  image: String;
  ready: String;
  restartCount: String;
  started: Boolean;
  startedAt: String;
}

export interface ContainerSnap extends ContainerType {
  snapshot: Number;
  kind: String;
  namespace: String;
  podName: String;
  labels: Object;
}

export interface ServiceType {
  kind: String;
  name: String;
  namespace: String;
  uid: String;
  creationTimestamp: String;
  clusterIPs: [String];
  selector: Object;
  type: String;
}

export interface ServiceSnap extends ServiceType {
  snapshot: Number;
}

export interface dataParserType {
  nodesParser(nodes: any): NodeType[];
  podsParser(pods: any): PodType[];
  servicesParser(services: any): ServiceType[];
}

export interface toolControllerType {
  setPort: RequestHandler;
  addSnapshotTime: RequestHandler;
  postNodes: RequestHandler;
  postPods: RequestHandler;
  postContainers: RequestHandler;
  postServices: RequestHandler;
  clusterData: RequestHandler;
}
