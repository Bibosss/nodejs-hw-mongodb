import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  authLoginSchema,
  authRegisterSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  sendResetEmailController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/request-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

export default authRouter;
