import { object } from 'joi';
import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/database';
import itemFactory from '../tests/factories/itemFactory'

describe('Testa POST /items ', () => {
  const item = itemFactory();

  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const result = await supertest(app).post('/items').send(item);

    expect(result.status).toBe(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const result = await supertest(app).post('/items').send(item);

    expect(result.status).toBe(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array',async () => {
    const result = await supertest(app).get(`/items`).send();
    
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const registeredItem = await (await supertest(app).get(`/items`).send()).body[0];
    const result = await supertest(app).get(`/items/${registeredItem.id}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Deve retornar status 404 caso não exista um item com esse id', async () => {
    const result = await supertest(app).get(`/items/1000`).send();

    expect(result.status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items"`;
  await prisma.$disconnect();
});