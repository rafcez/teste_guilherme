import { PrismaClient } from '@prisma/client';
import { Product } from '../models/Product';


const prisma = new PrismaClient();

export default {
  async getAll(): Promise<Product[]> {
    return prisma.product.findMany();
  },

  async getById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  },

  async create(data: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    return prisma.product.create({ data });
  },

  async update(id: string, data: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product | null> {
    return prisma.product.update({ where: { id }, data });
  },

  async delete(id: string): Promise<Product | null> {
    return prisma.product.delete({ where: { id } });
  }
};