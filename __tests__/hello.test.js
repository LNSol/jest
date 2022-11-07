import { jest } from '@jest/globals';
import request from 'supertest';
import { hello } from '../routes/api.js';
import { server } from '../index.js';

afterEach(() => server.close());

describe('hello', () => {
  test('hello 1', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    hello(req, res);
    // console.log('status >> ', res.status.mock);
    // console.log('send >> ', res.send.mock);

    const [[statusCode]] = res.status.mock.calls;
    const [[data]] = res.send.mock.calls;
    expect(statusCode).toBe(200);
    expect(data).toEqual('Hello World@@@');
  });

  test('hello 2', async () => {
    const response = await request(server).get('/');
    // console.log('res statusCod  >> ', res.statusCode);
    // console.log('res body >>> ', res.body);
    // console.log('res text >>> ', res.text);
    expect(response.text).toBe('Hello World@@@');
  });
});
