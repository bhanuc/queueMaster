const request = require('supertest')('http://localhost:4000');

describe('Test the whoami path', () => {
  test('It should response the GET method', () => request.get('/whoami').expect(200));
});
