import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

const PORT = process.env.PORT

app.listen(PORT, () => console.info(`Server linten on port ${PORT}`))
