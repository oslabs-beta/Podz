const namespace = {
  "kind": "NamespaceList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "17498"
  },
  "items": [
    {
      "metadata": {
        "name": "default",
        "uid": "6abd9b21-841a-4be5-82a6-98dadcbb72a3",
        "resourceVersion": "39",
        "creationTimestamp": "2023-12-16T19:50:28Z",
        "labels": {
          "kubernetes.io/metadata.name": "default"
        },
        "managedFields": [
          {
            "manager": "kube-apiserver",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-16T19:50:28Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:labels": {
                  ".": {},
                  "f:kubernetes.io/metadata.name": {}
                }
              }
            }
          }
        ]
      },
      "spec": {
        "finalizers": [
          "kubernetes"
        ]
      },
      "status": {
        "phase": "Active"
      }
    },
    {
      "metadata": {
        "name": "kube-node-lease",
        "uid": "6cf4cab6-c752-45b4-a322-9e81337aebef",
        "resourceVersion": "29",
        "creationTimestamp": "2023-12-16T19:50:28Z",
        "labels": {
          "kubernetes.io/metadata.name": "kube-node-lease"
        },
        "managedFields": [
          {
            "manager": "kube-apiserver",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-16T19:50:28Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:labels": {
                  ".": {},
                  "f:kubernetes.io/metadata.name": {}
                }
              }
            }
          }
        ]
      },
      "spec": {
        "finalizers": [
          "kubernetes"
        ]
      },
      "status": {
        "phase": "Active"
      }
    },
    {
      "metadata": {
        "name": "kube-public",
        "uid": "42a6e923-93cb-47e8-b9a2-119fefbb571f",
        "resourceVersion": "22",
        "creationTimestamp": "2023-12-16T19:50:28Z",
        "labels": {
          "kubernetes.io/metadata.name": "kube-public"
        },
        "managedFields": [
          {
            "manager": "kube-apiserver",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-16T19:50:28Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:labels": {
                  ".": {},
                  "f:kubernetes.io/metadata.name": {}
                }
              }
            }
          }
        ]
      },
      "spec": {
        "finalizers": [
          "kubernetes"
        ]
      },
      "status": {
        "phase": "Active"
      }
    },
    {
      "metadata": {
        "name": "kube-system",
        "uid": "6820c591-816d-45b5-a622-d02380b2067a",
        "resourceVersion": "12",
        "creationTimestamp": "2023-12-16T19:50:28Z",
        "labels": {
          "kubernetes.io/metadata.name": "kube-system"
        },
        "managedFields": [
          {
            "manager": "kube-apiserver",
            "operation": "Update",
            "apiVersion": "v1",
            "time": "2023-12-16T19:50:28Z",
            "fieldsType": "FieldsV1",
            "fieldsV1": {
              "f:metadata": {
                "f:labels": {
                  ".": {},
                  "f:kubernetes.io/metadata.name": {}
                }
              }
            }
          }
        ]
      },
      "spec": {
        "finalizers": [
          "kubernetes"
        ]
      },
      "status": {
        "phase": "Active"
      }
    }
  ]
}

const namespaceParser = (obj) => {
    const newArray = []

    obj.items.forEach(ele => {
      const newObj = {}
      newObj.kind = 'Namespace';
      newObj.name = ele.metadata.name;
      newObj.uid = ele.metadata.uid;
      newObj.creationTimestamp = ele.metadata.creationTimestamp;
      newObj.status = ele.status;
      newArray.push(newObj);
    })
    return newArray;
  }


console.log(namespaceParser(namespace))