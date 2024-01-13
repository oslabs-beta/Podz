//frontend types
export interface ToolSnapContainerProps {
  loadCluster: any;
  postSnap(): void;
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

export interface ToolFormProps {
  inputStatus(): void;
}

export interface ToolMetricProps {
  nodeData: any;
}

export interface ToolSnapDateRangeProps {
  date: any;
  setDate: any;
}

export interface DateObj {
  startDate: Date;
  endDate: Date;
  key: String;
}

export interface ToolSnapDropdownProps {
  date: DateObj[];
  setCluster: any;
}

//backend types
export interface NodeType {
  kind: String;
  name: String;
  uid: String;
  creationTimestamp: String;
  conditions: Object;
}

export interface NodeSnap extends NodeType {
  snapshotTime: Number;
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
  snapshotTime: Number;
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
  snapshotTime: Number;
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
  snapshotTime: Number;
}

//server ts
export interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}

export interface dataParserType {
  nodesParser(nodes: any): NodeType[];
  podsParser(pods: any): PodType[];
  servicesParser(services: any): ServiceType[];
}

import { RequestHandler } from 'express';

export interface toolControllerType {
  setPort: RequestHandler;
  addSnapshotTime: RequestHandler;
  getSnapshot: RequestHandler;
  getSnapshotTimeArray: RequestHandler;
  postNodes: RequestHandler;
  postPods: RequestHandler;
  postContainers: RequestHandler;
  postServices: RequestHandler;
  clusterData: RequestHandler;
  snapshotClusterData: RequestHandler;
}
