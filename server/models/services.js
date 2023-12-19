const serviceObject  = {
  "kind": "ServiceList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "228201"
  },
  "items": [
    {
      "metadata": {
        "name": "eds-service",
        "namespace": "default",
        "uid": "d99f9d9e-9843-4082-97b9-4bd23284de0d",
        "resourceVersion": "22836",
        "creationTimestamp": "2023-12-12T16:07:52Z",
        "annotations": {
          "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"eds-service\",\"namespace\":\"default\"},\"spec\":{\"ports\":[{\"nodePort\":30100,\"port\":8080,\"protocol\":\"TCP\",\"targetPort\":8080}],\"selector\":{\"app\":\"eds\"},\"type\":\"NodePort\"}}\n"
        },
        "managedFields": [
          {
            "manager": "kubectl-client-side-apply",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-12T16:07:52Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:annotations": {
                  ".": {},
                  "f:kubectl.kubernetes.io/last-applied-configuration": {}
                }
              },
              "f:spec": {
                "f:externalTrafficPolicy": {},
                "f:internalTrafficPolicy": {},
                "f:ports": {
                  ".": {},
                  "k:{\"port\":8080,\"protocol\":\"TCP\"}": {
                    ".": {},
                    "f:nodePort": {},
                    "f:port": {},
                    "f:protocol": {},
                    "f:targetPort": {}
                  }
                },
                "f:selector": {},
                "f:sessionAffinity": {},
                "f:type": {}
              }
            }
          }
        ]
      },
      "spec": {
        "ports": [
          {
            "protocol": "TCP",
            "port": 8080,
            "targetPort": 8080,
            "nodePort": 30100
          }
        ],
        "selector": {
          "app": "eds"
        },
        "clusterIP": "10.96.33.182",
        "clusterIPs": [
          "10.96.33.182"
        ],
        "type": "NodePort",
        "sessionAffinity": "None",
        "externalTrafficPolicy": "Cluster",
        "ipFamilies": [
          "IPv4"
        ],
        "ipFamilyPolicy": "SingleStack",
        "internalTrafficPolicy": "Cluster"
      },
      "status": {
        "loadBalancer": {}
      }
    },
    {
      "metadata": {
        "name": "eds2-service",
        "namespace": "default",
        "uid": "b06e9477-4f11-4064-9a1e-1c3bdea2bcac",
        "resourceVersion": "23036",
        "creationTimestamp": "2023-12-12T16:11:31Z",
        "annotations": {
          "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"eds2-service\",\"namespace\":\"default\"},\"spec\":{\"ports\":[{\"nodePort\":30200,\"port\":8081,\"protocol\":\"TCP\",\"targetPort\":8080}],\"selector\":{\"app\":\"eds2\"},\"type\":\"NodePort\"}}\n"
        },
        "managedFields": [
          {
            "manager": "kubectl-client-side-apply",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-12T16:11:31Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:annotations": {
                  ".": {},
                  "f:kubectl.kubernetes.io/last-applied-configuration": {}
                }
              },
              "f:spec": {
                "f:externalTrafficPolicy": {},
                "f:internalTrafficPolicy": {},
                "f:ports": {
                  ".": {},
                  "k:{\"port\":8081,\"protocol\":\"TCP\"}": {
                    ".": {},
                    "f:nodePort": {},
                    "f:port": {},
                    "f:protocol": {},
                    "f:targetPort": {}
                  }
                },
                "f:selector": {},
                "f:sessionAffinity": {},
                "f:type": {}
              }
            }
          }
        ]
      },
      "spec": {
        "ports": [
          {
            "protocol": "TCP",
            "port": 8081,
            "targetPort": 8080,
            "nodePort": 30200
          }
        ],
        "selector": {
          "app": "eds2"
        },
        "clusterIP": "10.100.95.205",
        "clusterIPs": [
          "10.100.95.205"
        ],
        "type": "NodePort",
        "sessionAffinity": "None",
        "externalTrafficPolicy": "Cluster",
        "ipFamilies": [
          "IPv4"
        ],
        "ipFamilyPolicy": "SingleStack",
        "internalTrafficPolicy": "Cluster"
      },
      "status": {
        "loadBalancer": {}
      }
    },
    {
      "metadata": {
        "name": "eds3-service",
        "namespace": "default",
        "uid": "b12e06d8-c854-4f19-9085-062f5e91a15c",
        "resourceVersion": "23088",
        "creationTimestamp": "2023-12-12T16:12:02Z",
        "annotations": {
          "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"name\":\"eds3-service\",\"namespace\":\"default\"},\"spec\":{\"ports\":[{\"nodePort\":30300,\"port\":8082,\"protocol\":\"TCP\",\"targetPort\":8080}],\"selector\":{\"app\":\"eds3\"},\"type\":\"NodePort\"}}\n"
        },
        "managedFields": [
          {
            "manager": "kubectl-client-side-apply",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-12T16:12:02Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:annotations": {
                  ".": {},
                  "f:kubectl.kubernetes.io/last-applied-configuration": {}
                }
              },
              "f:spec": {
                "f:externalTrafficPolicy": {},
                "f:internalTrafficPolicy": {},
                "f:ports": {
                  ".": {},
                  "k:{\"port\":8082,\"protocol\":\"TCP\"}": {
                    ".": {},
                    "f:nodePort": {},
                    "f:port": {},
                    "f:protocol": {},
                    "f:targetPort": {}
                  }
                },
                "f:selector": {},
                "f:sessionAffinity": {},
                "f:type": {}
              }
            }
          }
        ]
      },
      "spec": {
        "ports": [
          {
            "protocol": "TCP",
            "port": 8082,
            "targetPort": 8080,
            "nodePort": 30300
          }
        ],
        "selector": {
          "app": "eds3"
        },
        "clusterIP": "10.98.25.74",
        "clusterIPs": [
          "10.98.25.74"
        ],
        "type": "NodePort",
        "sessionAffinity": "None",
        "externalTrafficPolicy": "Cluster",
        "ipFamilies": [
          "IPv4"
        ],
        "ipFamilyPolicy": "SingleStack",
        "internalTrafficPolicy": "Cluster"
      },
      "status": {
        "loadBalancer": {}
      }
    },
    {
      "metadata": {
        "name": "kubernetes",
        "namespace": "default",
        "uid": "d96f550c-81a6-439a-995c-7228dec89a00",
        "resourceVersion": "194",
        "creationTimestamp": "2023-12-11T19:20:19Z",
        "labels": {
          "component": "apiserver",
          "provider": "kubernetes"
        },
        "managedFields": [
          {
            "manager": "kube-apiserver",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-11T19:20:19Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:labels": {
                  ".": {},
                  "f:component": {},
                  "f:provider": {}
                }
              },
              "f:spec": {
                "f:clusterIP": {},
                "f:internalTrafficPolicy": {},
                "f:ipFamilyPolicy": {},
                "f:ports": {
                  ".": {},
                  "k:{\"port\":443,\"protocol\":\"TCP\"}": {
                    ".": {},
                    "f:name": {},
                    "f:port": {},
                    "f:protocol": {},
                    "f:targetPort": {}
                  }
                },
                "f:sessionAffinity": {},
                "f:type": {}
              }
            }
          }
        ]
      },
      "spec": {
        "ports": [
          {
            "name": "https",
            "protocol": "TCP",
            "port": 443,
            "targetPort": 8443
          }
        ],
        "clusterIP": "10.96.0.1",
        "clusterIPs": [
          "10.96.0.1"
        ],
        "type": "ClusterIP",
        "sessionAffinity": "None",
        "ipFamilies": [
          "IPv4"
        ],
        "ipFamilyPolicy": "SingleStack",
        "internalTrafficPolicy": "Cluster"
      },
      "status": {
        "loadBalancer": {}
      }
    }
  ]
}

const usefulData = (obj) => {
  const result = []
  // for (let i = 0; i < obj.items.length; i++) {

  // }
  obj.items.forEach(ele => {
    const node = {}
    node.kind = obj.kind;
    node.name = ele.metadata.name;
    node.uid = ele.metadata.uid;
    node.namespace = ele.metadata.namespace;
    node.creationTimestamp = ele.metadata.creationTimestamp;
    node.clusterIPs = ele.spec.clusterIPs;
    if (ele.spec.selector) node.selector = ele.spec.selector
    node.type = ele.spec.type
    result.push(node)
  })
  return result;
}
console.log(usefulData(serviceObject));