import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({
    message: 'Dream Vault API Working!!!',
  });
});

export default app;
