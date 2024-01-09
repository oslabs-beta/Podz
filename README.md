![Logo](client/assets/smallerPodzLogo.png)

<div align='center'>

[![JavaScript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-343434?style=for-the-badge&logo=react&logoColor=00FFFF)](https://react.dev/)
[![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
[![D3.js](https://img.shields.io/badge/D3.js-363636?style=for-the-badge&logo=d3.js&logoColor=orange)](https://d3js.org/)
[![Jest](https://img.shields.io/badge/Jest-900C3F?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

</div>

<p align="center">
Podz is a Kubernetes cluster visualizer for developers to see the metrics of their cluster.<br/>Find out more at <a href="https://www.podz.com/" target="_blank">https://podz.com</a>!
</p>

## Table of Contents

- 🚀 [Features](#features)
- 📒 [Getting Started](#getting-started)
  - [Using Minikube](#using-minikube)
  - [Using Standalone Kubernetes](#using-standalone-kubernetes)
- [Examples](#examples)
- 🛠 [Roadmap](#roadmap)
- 🔗 [Contributions](#contributions)
- 🙆 [Founders](#founders)

## Features:

<div align="center">
  <img alt="Logo" src="./client/assets/demo.gif">
</div>

- Podz, an open-source Kubernetes dev tool, is designed to assist developers in visualizing the architecture of their Kubernetes clusters
- Our web-based GUI enables users of any operating system running a local Kubernetes cluster to effortlessly showcase and visualize their cluster
- With a single click, our platform easily retrieves, stores, and presents comprehensive cluster architecture along with health metrics for each node, pod, container, and service.
- You can view previous metrics with the use of snapshots.
- Included is an example project for users to test and explore Podz, allowing them to try out its features firsthand.

## Getting Started

Download:

- Docker Desktop (`https://www.docker.com/products/docker-desktop/`)
- kubectl (`https://kubernetes.io/docs/tasks/tools/`)
- Minikube (`https://minikube.sigs.k8s.io/docs/start/`).

You need to have containers up and running before continuing on. If you need project examples, go to [examples](#examples).

### Using Minikube

For testing purposes Podz, we highly recommend the usage of Minikube https://minikube.sigs.k8s.io/docs/start/, which uses a minimal local Kubernetes cluster.
To use Minikube with Podz, start Minikube with this command:

> minikube start --extra-config apiserver.cors-allowed-origins=["http://*”]

What this command does is start up minikube and prevent CORS blocking the connection between the Kubernetes API Server and the Podz website.

### Using Standalone Kubernetes

For standalone Kubernetes, first disable CORS blocking of [http://] requests in the Kuberenetes API Server's configuration.
Next, run the command:

> kubectl proxy --port=&lt;number&gt;

This can be any port of your choice, so long as you change the Podz website’s port to match it.

## Examples

In the `test-project` folder, you can use those project examples to store in your containers. Next, `cd` to the test project folder and run the command:

> docker-compose build

Now, you have 3 containers up and running!

## Roadmap

- Converting to TypeScript
- Testings for frontend

## Contributions

The open-source community is awesome because of contributors like you. Your contributions are invaluable!

If you have a suggestion, fork the repo and make a pull request. You can also open an issue to discuss your idea. And, don't forget to give the project a star! Thanks!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Founders

- Bin Zheng [Github](https://github.com/binzheng622) | [LinkedIn](https://www.linkedin.com/in/bin-zheng-b912532a/)
- Ezekiel Mohr [Github](https://github.com/Ezmr7) | [LinkedIn]()
- Jeffrey Mai [Github](https://github.com/jeffrey-mai) | [LinkedIn](https://www.linkedin.com/in/jeffrey-mai-fiv/)
- Philip Wang [Github](https://github.com/pwang10) | [LinkedIn](https://www.linkedin.com/in/philipwang1/)
