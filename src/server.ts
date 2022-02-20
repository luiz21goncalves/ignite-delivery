import { app } from './app';

const { PORT } = process.env;

app.listen(PORT, () => console.info(`Server linten on port ${PORT}`));
