import { type Context } from 'koa';
import { dbService } from '../services/db-service';
import { type User } from '../types/user.type';

class UserController {
  async getUsers(ctx: Context) {
    try {
      const users = await dbService.getUsers();
      ctx.body = { success: true, data: users };
    } catch (err: any) {
      ctx.status = 500;
      ctx.body = { success: false, message: err.message };
    }
  }
  async createUser(ctx: Context) {
    try {
      const { name, email } = ctx.request.body as User;
      if (!name || !email) {
        ctx.status = 400;
        ctx.body = { success: false, message: 'Name and email are required' };
        return;
      }
      await dbService.createUser({ name, email });
      ctx.body = { success: true, message: 'User created' };
    } catch (err: any) {
      ctx.status = 500;
      ctx.body = { success: false, message: err.message };
    }
  }
}

export const userController = new UserController();
