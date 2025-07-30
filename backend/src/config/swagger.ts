import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos - Teste Guilherme',
            version: '1.0.0',
            description: 'Documentação da API REST para o CRUD de Produtos.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Servidor de Desenvolvimento',
            },
        ],
        tags: [
            {
                name: 'Products',
                description: 'Gerenciamento de produtos'
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    required: ['name', 'category', 'price'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único do produto (gerado automaticamente).',
                            example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
                        },
                        name: {
                            type: 'string',
                            description: 'Nome do produto.',
                            example: 'Smart TV 4K'
                        },
                        description: {
                            type: 'string',
                            description: 'Descrição opcional do produto.',
                            example: 'Televisor com resolução 4K e acesso a aplicativos.'
                        },
                        category: {
                            type: 'string',
                            description: 'Categoria do produto (E, L, M, I).',
                            example: 'E'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            description: 'Preço do produto.',
                            example: 2499.99
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do registro.',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;