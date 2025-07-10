import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import koaStatic from 'koa-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
const router = new Router();

// 示例路由
router.get('/api/test', (ctx) => {
  ctx.body = { message: 'Hello from Koa!' };
});

app.use(router.routes());
app.use(router.allowedMethods());

// 在生产环境中提供前端静态文件
if (process.env.NODE_ENV === 'production') {
  app.use(koaStatic(path.join(__dirname, '../../dist')));

  // 处理前端路由
  app.use(async (ctx) => {
    try {
      ctx.type = 'html';
      ctx.body = createReadStream(path.join(__dirname, '../../dist/index.html'));
    } catch (err) {
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
