import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EventRoute from './EventRoute';
import AuthRoute from './AuthRoute';

const router = Router();

router.use('/events', AuthMiddleware.verifyToken, EventRoute);
router.use('/auth', AuthRoute);

export default router;
