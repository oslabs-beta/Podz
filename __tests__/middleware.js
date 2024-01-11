const mongoose = require('mongoose');
const {
  addDB,
  Node,
  Pod,
  Container,
  Service,
} = require('../server/models/toolModel.js');

const controller = require('../server/controllers/toolController.js');

jest.setTimeout(60000); // 60 sec before timeout

describe('Middleware Tests', () => {
  const req = { body: {} };
  const res = { locals: {} };
  const next = jest.fn(); // Jest mock function

  afterAll(() => {
    Node.findOneAndDelete({ snapshot: res.locals.snapshot });
    Pod.findOneAndDelete({ snapshot: res.locals.snapshot });
    Container.findOneAndDelete({ snapshot: res.locals.snapshot });
    Service.findOneAndDelete({ snapshot: res.locals.snapshot });
    mongoose.disconnect();
  });

  describe('Setting up database and port before loading cluster', () => {
    describe('addDB', () => {
      it('Connected to a database', async () => {
        // PUT YOUR MONGODB LINK (IMPORTANT!!!)
        req.body.databaseLink = 'mongodb+srv://jeffreymai:codesmith@cluster0.dnplar5.mongodb.net/?retryWrites=true&w=majority';
        await addDB(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('setPort', () => {
      it('Successfully set a port', async () => {
        // PUT YOUR API SERVER PORT (IMPORTANT!!!)
        req.body.portNumber = 10000;
        await controller.setPort(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('toolController', () => {
    describe('addSnapshotTime', () => {
      it('res.locals.snapshot correctly stored', async () => {
        await controller.addSnapshotTime(req, res, next);
        expect(res.locals.snapshot).toEqual(expect.any(Number));
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postNodes', () => {
      it('res.locals.nodesData correctly stored', async () => {
        await controller.postNodes(req, res, next);
        expect(res.locals.nodesData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postPods', () => {
      it('res.locals.podsData correctly stored', async () => {
        await controller.postPods(req, res, next);
        expect(res.locals.podsData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postContainers', () => {
      it('res.locals.containersData correctly stored', async () => {
        await controller.postContainers(req, res, next);
        expect(res.locals.containersData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postServices', () => {
      it('res.locals.servicesData correctly stored', async () => {
        await controller.postServices(req, res, next);
        expect(res.locals.servicesData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('clusterData', () => {
      it('res.locals.clusterData correctly stored', async () => {
        await controller.clusterData(req, res, next);
        expect(res.locals.clusterData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
