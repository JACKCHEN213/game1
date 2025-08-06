import Koa from 'koa';
import dotenv from 'dotenv';
import { type Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import koaViews from 'koa-views';
import Router from 'koa-router';
import path from 'path';
import { fileURLToPath } from 'url';
import koaStatic from 'koa-static';

import userRouter from './routes/user.route';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = new Koa();
const router = new Router({ prefix: '/api' });

// 中间件
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, 'res')));
app.use(
  koaViews(path.join(__dirname, 'views'), {
    extension: 'ejs',
  }),
);

// 示例路由
router.get('/test', (ctx: Context) => {
  ctx.type = 'html';
  ctx.body = `<h3>Hello from Koa!!!!<img src="http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}/res/entities/archer/archer map.png"></h3>`;
});

router.get('/list', async (ctx) => {
  await ctx.render('list', { name: 'list' });
});

router.post('/list', async (ctx) => {
  ctx.body = 'xxxxx';
});

router.use('/users', userRouter.routes(), userRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = (process.env.VITE_API_SERVER_PORT || 3000) as number;
const HOST = (process.env.VITE_API_SERVER_HOST || 'localhost') as string;

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

export default app;
