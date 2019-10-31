import request from 'supertest';

import app from '../src/app';
import config from '../src/config';
import logger from '../src/logger';

let server = null;

beforeEach(() => {
  server = app.listen(config.PORT, () => {
    Object.keys(config).map((key) => logger.info(`${key}: ${config[key]}`));
  });
});

afterEach(() => {
  server.close();
});

describe('Basic Tests', () => {
  test('should respond with 200 (GET)', async () => {
    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Hello Koa');
  });

  test('should respond with 200 (POST)', async () => {
    const user = { name: 'Roberto Achar', age: 38 };

    const response = await request(server)
      .post('/user')
      .send(user);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('age');
    expect(response.body.name).toEqual('Roberto Achar');
    expect(response.body.age).toEqual(38);
  });

  test('should respond with 404', async () => {
    const response = await request(server).get('/not-found');

    expect(response.status).toEqual(404);
    expect(response.type).toEqual('text/plain');
  });

  test('should respond with 422', async () => {
    const response = await request(server).get('/error');

    expect(response.status).toEqual(422);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Error');
  });

  test('should respond with 500', async () => {
    const response = await request(server).get('/broke');

    expect(response.status).toEqual(500);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Something is broken');
  });
});
