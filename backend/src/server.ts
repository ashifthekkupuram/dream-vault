import app from './app';
import config from './config/config';

app.listen(config, () => {
  console.log(`Server is running at Port ${config.port}`);
});
