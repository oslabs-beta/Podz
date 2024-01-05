// import db from '../server/controllers/toolController';
const db = require('../server/controllers/toolController');
const { Node, Pod, Container, Service } = require('../server/models/toolModel.js');

jest.setTimeout(60000); // 60 sec

describe('Database Tests', () => {
  const req = {};
  const res = { locals: {} };
  const next = jest.fn(); // Jest mock function

  // beforeEach(() => {
  //   req = {};
  //   res = { locals: {} };
  // });

  afterAll(() => {
    Node.findOneAndDelete({snapshot: res.locals.snapshot});
    console.log('yay');
  })

  describe('toolController', () => {
    describe('addSnapshotTime', () => {
      it('res.locals.snapshot correctly stored', async () => {
        await db.addSnapshotTime(req, res, next);
        expect(res.locals.snapshot).toEqual(expect.any(Number));
        expect(next).toHaveBeenCalled();
      })
    });
  
    describe('postNodes', () => {
      it('res.locals.nodesData correctly stored', async () => {
        await db.postNodes(req, res, next);
        console.log('After postNodes');
        console.log(res);
        // expect(res.locals.nodesData.length).not.toEqual(0);
        expect(next).toHaveBeenCalled();
      })
    });
  
    xdescribe('postPods', () => {

    });
  
    describe('postContainers', () => {
      
    });
  
    describe('postServices', () => {
      
    });
  
    describe('clusterData', () => {
      
    });
  })
});