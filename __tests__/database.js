const mongoose = require('mongoose');
const db = require('../server/controllers/toolController');
const {
  addDB,
  Node,
  Pod,
  Container,
  Service,
} = require('../server/models/toolModel.js');

jest.setTimeout(60000); // 60 sec before timeout

describe('Database Tests', () => {
  const req = { body: {} };
  const res = { locals: {} };
  const next = jest.fn(); // Jest mock function

  afterAll(() => {
    Node.findOneAndDelete({ snapshot: res.locals.snapshot });
    mongoose.disconnect();
  });

  describe('Setting up database and port before loading cluster', () => {
    describe('addDB', () => {
      it('Connected to a database', async () => {
        // PUT YOUR MONGODB LINK (IMPORTANT!!!!)
        req.body.databaseLink = 'Input Your MongoDB Link Here';
        await addDB(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('setPort', () => {
      it('Successfully set a port', async () => {
        req.body.portNumber = 56789;
        await db.setPort(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('toolController', () => {
    describe('addSnapshotTime', () => {
      it('res.locals.snapshot correctly stored', async () => {
        await db.addSnapshotTime(req, res, next);
        expect(res.locals.snapshot).toEqual(expect.any(Number));
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postNodes', () => {
      it('res.locals.nodesData correctly stored', async () => {
        await db.postNodes(req, res, next);
        expect(res.locals.nodesData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postPods', () => {
      it('res.locals.podsData correctly stored', async () => {
        await db.postPods(req, res, next);
        expect(res.locals.podsData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postContainers', () => {
      it('res.locals.containersData correctly stored', async () => {
        await db.postContainers(req, res, next);
        expect(res.locals.containersData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('postServices', () => {
      it('res.locals.servicesData correctly stored', async () => {
        await db.postServices(req, res, next);
        expect(res.locals.servicesData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('clusterData', () => {
      it('res.locals.clusterData correctly stored', async () => {
        await db.clusterData(req, res, next);
        expect(res.locals.clusterData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
        console.log(res);
      });
    });
  });
});
