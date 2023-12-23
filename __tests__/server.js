import request from 'supertest';
import db from '../server/controllers/toolController';
const server = 'http://localhost:3000';

describe('Server Endpoints', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        // return request(server)
        //   .get('/')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });
    });

    describe('POST', () => {
      it('responds with 200 status and text/html content type', () => {
        // return request(server)
        //   .get('/')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });
    });
  });

  describe('/tool', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        // return request(server)
        //   .get('/')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });
    });

    describe('POST', () => {
      it('responds with 200 status and text/html content type', () => {
        // return request(server)
        //   .get('/')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });
    });
  });
});