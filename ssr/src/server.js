import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import App from './app/App';

const apiServer = process.env.API_SERVER || 'http://localhost:8080/todos';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('build/js'));
app.use(express.static('build/css'));

const html_template = (app) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <title>SSR React</title>
</head>
<body>
  <div id="root">${app}</div>
  
  <script src="./bundle.js"></script>
</body>
</html>
`;

app.get('/', (req, res) => {
  axios
    .get(apiServer)
    .then(({ data }) => {
      const str = renderToString(<App init={data} />);
      res.send(html_template(str));
    })
    .catch(() => {
      res.send('There was an error fetching data!');
    });
});

app.listen(port, () => console.log(`SSR Server running on port: ${port}`));
