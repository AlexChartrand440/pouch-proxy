import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as koaMount from 'koa-mount';
import * as koaStaticServer from 'koa-static';
import { settings } from './src/settings';

console.info('Starting Koa server ...');
const app = new Koa();
const router = new KoaRouter();

router.get('/', (ctx, next) => {
  ctx.body = "Hello World!!";
});

app
  // Request and Response logging
  .use((ctx, next) => {
    let start: number = new Date().getTime();
    return next().then(() => {
      let ms = new Date().getTime() - start;
      console.log({
        request: {
          method: ctx.request.method,
          url: ctx.request.url,
          ip: ctx.request.ip,
          userAgent: ctx.request.get('user-agent')
        },
        response: {
          status: ctx.response.status,
          message: ctx.response.message,
          contentType: ctx.response.get('content-type'),
          latency: ms
        }
    });
      ctx.set('X-Response-Time', ms + 'ms');
    });
  })
  // Serve static files from public folder
  .use(koaMount('/', koaStaticServer('./public', {
    maxage: 1000 * 60 * 60, // Browser cache max-age in milliseconds.
    hidden: false, // Allow transfer of hidden files.
    gzip: true, // Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
    defer: true // If true, serves after yield next, allowing any downstream middleware to respond first.
  })))
  .use(router.routes())
  .use(router.allowedMethods());

console.info("Listening on port", settings.listen_port);
app.listen(settings.listen_port);