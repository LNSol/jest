import { jest } from '@jest/globals';
import request from 'supertest';
import { apiParams } from '../routes/api.js';
import { server } from '../index.js';

afterEach(() => server.close());

const makeQuery = (query) => {
  const rets = [];
  for (const key in query) {
    rets.push([`${key}=${query[key]}`]);
  }
  return rets.join('&');
};
const makeUrl = ({ appid, version, schemas, idcmd, query }) => {
  return `/api/${appid}/${version}/${schemas}/${idcmd}?${makeQuery(query)}`;
};

describe('makeQuery & makeUrl', () => {
  test('makeQuery', () => {
    const sq = { searchStr1: 'A', searchStr2: 'B' };
    expect(makeQuery(sq)).toEqual('searchStr1=A&searchStr2=B');
  });

  test('makeUrl', () => {
    const sp = {
      appid: 'www',
      version: '0.1.0',
      schemas: 'users',
      idcmd: 'all',
      query: { searchStr1: 'A' },
    };
    const expectedData = `/api/${sp.appid}/${sp.version}/${sp.schemas}/${
      sp.idcmd
    }?${makeQuery(sp.query)}`;
    expect(makeUrl(sp)).toEqual(expectedData);
  });
});

describe('apiParams', () => {
  test('apiParams', async () => {
    const expectedData = {
      appid: 'www',
      version: '0.1.0',
      schemas: 'users',
      idcmd: 'all',
      query: { searchStr1: 'A', searchStr2: 'B' },
    };
    const sampleUrl = makeUrl(expectedData);
    const response = await request(server).get(
      sampleUrl.replace('/api/', '/apiparams/')
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  test('apiParams test 2', () => {
    const params = {
      appid: 'www',
      version: '0.1.0',
      schemas: 'users',
      idcmd: 'all',
    };
    const query = { searchStr: 'A' };
    const req = { params, query };
    const res = { json: jest.fn() };
    apiParams(req, res);

    const [[data]] = res.json.mock.calls;
    expect(data).toEqual({ ...params, query });
  });
});
