import 'dotenv/config';
import express from 'express';
import Auth from './controllers/auth';
import {Comment} from './models';

const app = express();
const port = '4000';
const auth = new Auth();

app.use(express.json());

app.use('/auth', auth.router);
app.use(auth.auth);

app.get('/test', (req, res) => {
    res.send({message: 'It works!', user: req.user});
});

// Comment.create(
//   {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lacus nec hendrerit porta. Phasellus non ex eget orci pulvinar pulvinar. Nulla facilisi.',
//     userId: 1,
//   })

app.listen(port, () => console.log(`Server started at http://localhost:${port} port`));
