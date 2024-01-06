// import request from 'supertest';
const request = require('supertest');
const server = 'http://localhost:3000';

describe('Server Endpoints', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(404)
          .expect((res) => {
            if (!res.text.includes('Page Not Found')) {
              throw new Error(
                'Expected response body to contain: "Page Not Found"'
              );
            }
          });
      });
    });
  });

  describe('/tool', () => {
    describe('GET', () => {
      it('responds with 301 status and text/html content type', () => {
        return request(server)
          .get('/tool')
          .expect('Content-Type', /text\/html/)
          .expect(301); // 301 ->
      });
    });
  });

  describe('/tool/data', () => {
    describe('GET', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .get('/tool/data')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
