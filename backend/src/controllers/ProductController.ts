import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        return res.status(409).json({ message: 'Produto com este nome e categoria já existe.' });
      }
      next(err);
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const paginatedProducts = await ProductService.getAll(page, pageSize);
      res.json(paginatedProducts);
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.status(200).json(product);
      res.json(product);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError && 
        err.code === 'P2002'
      ) {
        return res.status(409).json({ message: 'Produto com este nome já existente.' });
      }
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.delete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();