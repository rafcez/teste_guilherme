import { Product } from '../../models/Product';

const mockPrisma = {
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
}));

import productService from '../../services/ProductService';

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
    it('deve retornar uma lista de todos os produtos', async () => {
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);

      const products = await productService.getAll();

      expect(products).toEqual([mockProduct]);
      expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('deve retornar um único produto se o ID for encontrado', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const product = await productService.getById('uuid-12345');

      expect(product).toEqual(mockProduct);
      expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ 
        where: { id: 'uuid-12345' } 
      });
    });

    it('deve retornar null se o ID não for encontrado', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      const product = await productService.getById('uuid-inexistente');

      expect(product).toBeNull();
      expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ 
        where: { id: 'uuid-inexistente' } 
      });
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
      const createdProduct = { 
        id: 'uuid-new', 
        ...newProductData, 
        created_at: dateNow 
      };
      mockPrisma.product.create.mockResolvedValue(createdProduct);

      const product = await productService.create(newProductData);

      expect(product).toEqual(createdProduct);
      expect(mockPrisma.product.create).toHaveBeenCalledWith({ 
        data: newProductData 
      });
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar os dados de um produto', async () => {
      const updateData = { price: 399.9 };
      const updatedProduct = { ...mockProduct, ...updateData };
      mockPrisma.product.update.mockResolvedValue(updatedProduct);

      const product = await productService.update('uuid-12345', updateData);

      expect(product).toEqual(updatedProduct);
      expect(mockPrisma.product.update).toHaveBeenCalledWith({
        where: { id: 'uuid-12345' },
        data: updateData,
      });
    });
  });

  describe('delete', () => {
    it('deve deletar e retornar o produto removido', async () => {
      mockPrisma.product.delete.mockResolvedValue(mockProduct);

      const product = await productService.delete('uuid-12345');

      expect(product).toEqual(mockProduct);
      expect(mockPrisma.product.delete).toHaveBeenCalledWith({ 
        where: { id: 'uuid-12345' } 
      });
    });
  });
});