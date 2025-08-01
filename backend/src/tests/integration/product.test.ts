import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  })),
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error { },
  }
}));

import productService from '../../services/ProductService';
import { Product } from '../../models/Product';

const mockedPrisma = new PrismaClient();

describe('ProductService - Unit Tests', () => {
  const dateNow = new Date();

  const mockProduct: Product = {
    id: 'uuid-12345',
    name: 'Teclado Mecânico',
    description: 'Teclado com switches blue',
    category: 'I',
    price: 350.0,
    created_at: dateNow,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('deve retornar uma lista paginada de produtos com o total', async () => {
      const page = 1;
      const pageSize = 10;
      const totalProducts = 1;
      const transactionResult = [totalProducts, [mockProduct]];
      (mockedPrisma.$transaction as jest.Mock).mockResolvedValue(transactionResult);

      const result = await productService.getAll(page, pageSize);

      expect(result.data).toEqual([mockProduct]);
      expect(result.total).toBe(totalProducts);
    });
  });

  describe('getById', () => {
    it('deve retornar um único produto se o ID for encontrado', async () => {
      (mockedPrisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
      const product = await productService.getById('uuid-12345');
      expect(product).toEqual(mockProduct);
    });

    it('deve retornar null se o ID não for encontrado', async () => {
      (mockedPrisma.product.findUnique as jest.Mock).mockResolvedValue(null);
      const product = await productService.getById('uuid-inexistente');
      expect(product).toBeNull();
    });
  });

  describe('create', () => {
    it('deve criar e retornar um novo produto', async () => {
      const newProductData = {
        name: 'Mouse Gamer',
        description: 'Mouse com 16000 DPI',
        category: 'I',
        price: 250.0,
      };
      const createdProduct = { id: 'uuid-new', ...newProductData, created_at: dateNow };

      (mockedPrisma.product.create as jest.Mock).mockResolvedValue(createdProduct);

      const product = await productService.create(newProductData);

      expect(product).toEqual(createdProduct);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar os dados de um produto', async () => {
      const updateData = { price: 399.9 };
      const updatedProduct = { ...mockProduct, ...updateData };

      (mockedPrisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const product = await productService.update('uuid-12345', updateData);

      expect(product).toEqual(updatedProduct);
    });
  });

  describe('delete', () => {
    it('deve deletar e retornar o produto removido', async () => {
      (mockedPrisma.product.delete as jest.Mock).mockResolvedValue(mockProduct);

      const product = await productService.delete('uuid-12345');

      expect(product).toEqual(mockProduct);
    });
  });
});