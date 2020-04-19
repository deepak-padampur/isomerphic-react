import express from 'express';
import yields from 'express-yields';//For using the generators
import fs from 'fs-extra';
import webpack from 'webpack';
//instanciate express
const app = express();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }));
  app.use(require('webpack-hot-middleware')(compiler))

}

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile(`./public/index.html`, 'utf-8');
  res.send(index);
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at ${port}`);
})
