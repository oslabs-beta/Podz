"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataParser = {};
/* Node Parser */
dataParser.nodesParser = function (nodes) {
    //Filters through desired conditions data;
    var conditionsFilter = function (node) {
        var resultObj = {};
        var conditions = node['status']['conditions'];
        for (var i = 0; i < conditions.length; i++) {
            var newObj = {
                status: '',
                message: ''
            };
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
    var items = nodes.items;
    var newArray = [];
    for (var i = 0; i < items.length; i++) {
        var newObj = {};
        var node = items[i];
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
dataParser.podsParser = function (pods) {
    //Filters through desired conditions data;
    var conditionsFilter = function (pod) {
        var resultObj = {};
        var conditions = pod['status']['conditions'];
        for (var i = 0; i < conditions.length; i++) {
            // resultObj[conditions[i]["type"]] = conditions[i]["type"]
            // const newObj = {};
            // newObj.status = conditions[i]["status"]
            // newObj.message = conditions[i]["message"]
            // resultObj[conditions[i]["type"]] = newObj
            resultObj[conditions[i]['type']] = conditions[i]['status'];
        }
        return resultObj;
    };
    var containerFilter = function (pod) {
        var resultArray = [];
        var containers = pod['spec']['containers'];
        var containerStatuses = pod['status']['containerStatuses'];
        // console.log(containerStatuses)
        for (var i = 0; i < containers.length; i++) {
            var newObj = {};
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
    var labelFilter = function (pod) {
        var resultObj = {};
        for (var key in pod) {
            var keyWithoutPeriods = key.replace(/\./g, '%2E');
            resultObj[keyWithoutPeriods] = pod[key];
        }
        return resultObj;
    };
    var items = pods.items;
    var newArray = [];
    for (var i = 0; i < items.length; i++) {
        var newObj = {};
        var pod = items[i];
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
dataParser.servicesParser = function (service) {
    var newArray = [];
    for (var i = 0; i < service.items.length; i++) {
        var ele = service.items[i];
        var newObj = {};
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
exports.default = dataParser;
