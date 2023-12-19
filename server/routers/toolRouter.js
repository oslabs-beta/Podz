app.get('/tool', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);
