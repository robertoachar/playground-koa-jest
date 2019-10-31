import KoaRouter from 'koa-router';

const router = KoaRouter();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello Koa' };
});

router.post('/user', async (ctx) => {
  const user = ctx.request.body;

  ctx.body = user;
});

router.get('/error', async () => {
  throw new Error('Error');
});

router.get('/broke', async () => {
  const error = new Error();
  error.name = 'UnknownError';
  error.message = 'Unknown Error';

  throw error;
});

export default router;
