import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './src/main.server';

// A szerveralkalmazás exportálása, hogy használható legyen szerver nélküli funkciókban.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.html'); // Győződj meg róla, hogy ez az útvonal megfelelő

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Példa Express Rest API végpontokra
  // server.get('/api/**', (req, res) => { });
  // Statikus fájlok kiszolgálása a /browser mappából
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Minden szabályos útvonal az Angular motor használatával
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // A Node szerver elindítása
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express szerver hallgatózik a következőn: http://localhost:${port}`);
  });
}

run();
