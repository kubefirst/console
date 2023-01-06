const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname + '/storybook-static')));

const PORT = 80;
app.listen(PORT, () => {
  console.log('Storybook is running at http://localhost:%d', PORT);
});
