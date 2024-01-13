// import request from 'supertest';
const request = require('supertest');
const server = 'http://localhost:3000';

describe('Server Endpoints', () => {
  describe('/api/tool', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
          .get('/api/tool')
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

  describe('/api/tool/data', () => {
    describe('GET', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .get('/api/tool/data')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });

    describe('POST', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .post('/api/tool/data')
          .send({
            // PUT YOUR MONGODB LINK (IMPORTANT!!!)
            databaseLink: 'MONGODB LINK',
            // PUT YOUR API SERVER PORT (IMPORTANT!!!)
            portNumber: 10000,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/api/tool/snapshot', () => {
    describe('GET', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .get('/api/tool/snapshot')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/api/tool/snapshot/list', () => {
    describe('GET', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .get('/api/tool/snapshot/list')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
