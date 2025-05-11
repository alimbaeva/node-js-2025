import http, { RequestOptions } from 'http';
import { AddressInfo } from 'net';
import { writeUsers } from '../utils/usersStorage';
import { createServer } from '../index';

let server: http.Server;
let port: number;

beforeAll((done) => {
  server = createServer().listen(0, () => {
    const address = server.address() as AddressInfo;
    port = address.port;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  writeUsers([]);
});

function makeRequest(options: RequestOptions, body?: any): Promise<{ status: number, data: any }> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        let data;
        try {
          data = JSON.parse(responseData);
        } catch {
          data = responseData;
        }
        resolve({ status: res.statusCode || 0, data });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

test('Create user', async () => {
  const options: RequestOptions = {
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    username: 'Test',
    age: 25,
    hobbies: ['books'],
  };

  const { status, data } = await makeRequest(options, body);

  expect(status).toBe(201);
  expect(data).toHaveProperty('id');
  expect(data.username).toBe('Test');
});

test('Get all users', async () => {
  await makeRequest({
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'User1',
    age: 22,
    hobbies: ['run'],
  });

  const getOptions: RequestOptions = {
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'GET',
  };

  const { status, data } = await makeRequest(getOptions);

  expect(status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(1);
});

test('Get user by valid ID', async () => {
  const { data: createdUser } = await makeRequest({
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'TestUser',
    age: 30,
    hobbies: ['reading'],
  });

  const { status, data } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/${createdUser.id}`,
    method: 'GET',
  });

  expect(status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data.some((user: any) => user.id === createdUser.id)).toBe(true);
});

test('Get user by invalid ID (not UUID)', async () => {
  const { status, data } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/invalid-id`,
    method: 'GET',
  });

  expect(status).toBe(404);
  expect(data).toEqual({ message: 'User not found' });
});

test('Update user by valid ID', async () => {
  const { data: user } = await makeRequest({
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'OriginalUser',
    age: 20,
    hobbies: ['swimming'],
  });

  const updatedBody = {
    username: 'UpdatedUser',
    age: 25,
    hobbies: ['coding'],
  };

  const { status, data } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/${user.id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }, updatedBody);

  expect(status).toBe(200);
  expect(data.username).toBe('UpdatedUser');
  expect(data.age).toBe(25);
  expect(data.hobbies).toEqual(['coding']);
});

test('Update user with invalid ID format', async () => {
  const { status, data } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/not-a-uuid`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'InvalidUser',
    age: 30,
    hobbies: ['none'],
  });

  expect(status).toBe(400);
  expect(data).toEqual({ message: 'Invalid user id' });
});

test('Update user with invalid body', async () => {
  const { data: user } = await makeRequest({
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'BadBodyUser',
    age: 23,
    hobbies: ['play'],
  });

  const { status, data } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/${user.id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'Oops',
    age: 'wrong-type',
    hobbies: [],
  });

  expect(status).toBe(400);
  expect(data.message).toBe('Missing or invalid required fields');
});

test('Delete user by valid ID', async () => {
  const { data: user } = await makeRequest({
    hostname: 'localhost',
    port,
    path: '/api/users',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    username: 'ToDelete',
    age: 99,
    hobbies: ['none'],
  });

  const { status } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users/${user.id}`,
    method: 'DELETE',
  });

  expect(status).toBe(204);
  const { status: getStatus, data: getData } = await makeRequest({
    hostname: 'localhost',
    port,
    path: `/api/users`,
    method: 'GET',
  });

  expect(getStatus).toBe(200);
  expect(getData.some((u: any) => u.id === user.id)).toBe(false);
});
