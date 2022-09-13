import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'
import trimRequest from 'trim-request'

import 'express-async-errors'

import router from './routes'
import documentation from './docs/swagger'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(trimRequest.all)

app.use(swagger.serveWithOptions())
app.get('', swagger.setup(documentation))

app.use(router)

app.use(errorHandler())

export default app
