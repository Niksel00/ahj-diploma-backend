const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const cors = require('koa2-cors');
const WS = require('ws');
const path = require('path');
const Storage = require('./Storage.js');

const app = new Koa();
const router = new Router();

// Body Parsers
app.use(koaBody({
    json: true, text: true, urlencoded: true, multipart: true,
  }));
  
  // CORS
  app.use(
    cors({
      origin: '*',
      credentials: true,
      'Access-Control-Allow-Origin': true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );
  
  // Routers
  app.use(router.routes()).use(router.allowedMethods());
  
  // Files Directory
  const filesDir = path.join(__dirname, '/files');
  app.use(koaStatic(filesDir));
  
  // Starting Server
  const port = process.env.PORT || 7070;
  const server = http.createServer(app.callback());
  const wsServer = new WS.Server({ server });