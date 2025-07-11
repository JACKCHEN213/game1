import Router from 'koa-router';
import { type Context } from 'koa';
import { userController } from '../controllers/user.controller';

const router = new Router();

router.get('/', (ctx: Context) => {
  userController.getUsers(ctx);
});
router.post('/', (ctx: Context) => {
  userController.createUser(ctx);
});

export default router;
