import dotenv from 'dotenv'

import { app } from './app'

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => console.info(`Server linten on port ${PORT}`))
