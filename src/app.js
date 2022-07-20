import 'dotenv/config';
import express from 'express';
import Auth from './controllers/auth';

const app = express();
const port = '4000';
const auth = new Auth();

app.use(express.json());

app.use('/auth', auth.router);
app.use(auth.auth);

app.get('/test', (req, res) => {
    res.send(req.user);
});

app.listen(port, () => console.log(`Server started at http://localhost:${port} port`));