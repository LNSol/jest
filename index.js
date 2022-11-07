import express from 'express';
import { PORT } from './config.js';
import { hello, apiParams } from './routes/api.js';
console.log(PORT);

const app = express();

app.get('/', hello);

app.get('/apiparams/:appid/:version/:schemas/:idcmd', apiParams);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };
