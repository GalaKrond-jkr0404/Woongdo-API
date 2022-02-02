import App from './app';

// HTTPS CONFIGURE
import fs from 'fs';
import https from 'https';
import http from 'http';

const app = new App().application;

const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
    res.end();
});

const httpsServer = https.createServer(
    {
        key: fs.readFileSync('/root/.acme.sh/woongdo.kro.kr/woongdo.kro.kr.key', 'utf-8'),
        cert: fs.readFileSync('/root/.acme.sh/woongdo.kro.kr/woongdo.kro.kr.cer', 'utf-8'),
        ca: fs.readFileSync('/root/.acme.sh/woongdo.kro.kr/ca.cer', 'utf-8'),
    },
    app
);

httpServer.listen(80, () => {
    console.log('HTTP Server Start');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server Start');
});