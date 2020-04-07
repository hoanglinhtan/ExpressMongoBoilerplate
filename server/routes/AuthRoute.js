import { Router } from 'express';
import { authController } from '../controllers';
import { authValidator } from '../validators';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

/**
 * @endpoint /auth/login
 * @method POST
 * @name Login
 * @description Request login
 *
 * @body {Object}  { email, password }
 *
 * @success {Object} { id, email, username, accessToken }
 */
router.route('/login').post([authValidator.validateLogin], authController.login);

/**
 * @endpoint /auth/login
 * @method GET
 * @name Logout
 * @description Request login
 *
 * @success {Boolean} { true/false }
 */
router.route('/logout').get([AuthMiddleware.verifyToken], authController.logout);

/**
 * @endpoint /auth/register
 * @method POST
 * @name Register
 * @description Request register
 *
 * @body {Object}  { username, password }
 *
 * @success {Object} { id, username }
 */
router.route('/register').post([authValidator.validateRegister], authController.register);

export default router;
