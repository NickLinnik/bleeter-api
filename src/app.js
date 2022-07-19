import 'dotenv/config'
import express from 'express';
import Auth from './controllers/auth'

const app = express();
const port = '4000';
const {router, auth} = new Auth()

app.use(express.json())
app.use('/auth', router)

app.listen(port, () => console.log(`Server started at http://localhost:${port} port`));