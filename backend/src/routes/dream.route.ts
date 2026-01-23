import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated';
import {
  getDreams,
  getDream,
  createDream,
  updateDream,
  deleteDream,
} from '../controllers/dream.controller';
import isDreamCreator from '../middlewares/isDreamCreator';

const dreamRouter = express.Router();

dreamRouter.get('/', isAuthenticated, getDreams);
dreamRouter.get('/:id', isAuthenticated, isDreamCreator, getDream);
dreamRouter.post('/', isAuthenticated, createDream);
dreamRouter.put('/:id', isAuthenticated, isDreamCreator, updateDream);
dreamRouter.delete('/:id', isAuthenticated, isDreamCreator, deleteDream);

export default dreamRouter;
