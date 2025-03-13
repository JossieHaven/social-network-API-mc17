import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index';

// Mount all API routes under the /api endpoint

router.use('/api', apiRoutes);

// Handle undefined routes with a default response

router.use((_req, res) => {
  return res.send('Wrong route!'); 
});

export default router;
