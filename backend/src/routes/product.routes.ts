import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma lista de produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRoutes.get('/', ProductController.listAll);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Erro na requisição (dados inválidos).
 */
productRoutes.post('/', ProductController.create);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os dados do produto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado.
 */
productRoutes.get('/:id', ProductController.getById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       400:
 *         description: Erro na requisição (dados inválidos).
 *       404:
 *         description: Produto não encontrado.
 */
productRoutes.put('/:id', ProductController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
productRoutes.delete('/:id', ProductController.delete);

export default productRoutes;