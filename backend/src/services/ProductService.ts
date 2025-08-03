import { PrismaClient } from '@prisma/client';
import { Product } from '../models/Product';


const prisma = new PrismaClient();

export type PaginatedProductsResponse = {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export default {
  async getAll(page: number, pageSize: number): Promise<PaginatedProductsResponse> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [total, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: skip,
        take: take,
        orderBy: {
          created_at: 'desc'
        }
      })
    ]);

    return {
      data: products,
      total: total,
      page: page,
      pageSize: pageSize,
    };
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