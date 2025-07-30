import { Request, Response } from 'express';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, category, price } = req.body;
    return res.status(201).json({ 
      message: 'Produto criado com sucesso!', 
      data: { name, category, price } 
    });
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'Listando todos os produtos.' });
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return res.status(200).json({ message: `Buscando o produto com id: ${id}` });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, category, price } = req.body;
    return res.status(200).json({ 
      message: `Produto com id: ${id} atualizado.`,
      data: { name, category, price }
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return res.status(200).json({ message: `Produto com id: ${id} deletado.` });
  }
}

export default new ProductController();