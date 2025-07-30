import express from 'express';
import routes from './routes';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API documentation available at http://localhost:${PORT}/api-docs`);
});