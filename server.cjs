'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.webp':'image/webp',
  '.pdf':'application/pdf',
  '.mp3':'audio/mpeg'
};

function headers(extra={}) {
  return {'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin',...extra};
}

function serve(req,res,pathname) {
  if(!['GET','HEAD'].includes(req.method)){
    res.writeHead(405,headers({'Allow':'GET, HEAD'}));res.end();return;
  }
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){
    res.writeHead(403,headers({'Content-Type':'text/plain; charset=utf-8'}));res.end('Forbidden');return;
  }
  fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){
      res.writeHead(404,headers({'Content-Type':'text/plain; charset=utf-8'}));res.end('Not found');return;
    }
    const type=types[path.extname(file).toLowerCase()]||'application/octet-stream';
    res.writeHead(200,headers({'Content-Type':type,'Content-Length':stat.size,'Cache-Control':'no-cache'}));
    if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
  });
}

const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}
  catch{res.writeHead(400,headers({'Content-Type':'text/plain; charset=utf-8'}));res.end('Invalid URL');return;}
  serve(req,res,pathname);
});

server.listen(port,'127.0.0.1',()=>console.log(`Klar is ready: http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
