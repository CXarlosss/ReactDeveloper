// src/__tests__/product.test.ts


import request from 'supertest';
import app from '../app';
import { dbTest, Product } from '../dbForTest';
beforeAll(async () => {
  // Inicializar base de datos en memoria
  await dbTest.sync({ force: true });
});

beforeEach(async () => {
  // Limpiar productos antes de cada test
  await Product.destroy({ where: {} });
});

afterAll(async () => {
  await dbTest.close(); // Cerrar la conexión tras todos los tests
});

describe('API /products', () => {
  describe('POST /products', () => {
    it('debería crear un producto válido', async () => {
      const res = await request(app).post('/products').send({
        name: 'Coca Cola',
        price: 1.5,
        availability: true
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Coca Cola');
    });

    it('debería fallar si el precio es negativo', async () => {
      const res = await request(app).post('/products').send({
        name: 'Pepsi',
        price: -1,
        availability: true
      });

      expect(res.status).toBe(400);
      expect(res.body.errors).toContain('El precio debe ser un número positivo');
    });
  });

  describe('PUT /products/:id', () => {
    it('debería actualizar completamente un producto existente', async () => {
      const producto = await Product.create({ name: 'Agua', price: 1, availability: true });

      const res = await request(app).put(`/products/${producto.id}`).send({
        name: 'Agua Mineral',
        price: 2,
        availability: false
      });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Agua Mineral');
      expect(res.body.availability).toBe(false);
    });
  });

  describe('PATCH /products/:id', () => {
    it('debería actualizar parcialmente un producto', async () => {
      const producto = await Product.create({ name: 'Zumo', price: 2, availability: true });

      const res = await request(app).patch(`/products/${producto.id}`).send({
        price: 3
      });

      expect(res.status).toBe(200);
      expect(res.body.price).toBe(3);
    });
  });

  describe('DELETE /products/:id', () => {
    it('debería eliminar un producto existente', async () => {
      const producto = await Product.create({ name: 'Té', price: 1, availability: true });

      const res = await request(app).delete(`/products/${producto.id}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/eliminado correctamente/);

      const deleted = await Product.findByPk(producto.id);
      expect(deleted).toBeNull();
    });
  });
});
