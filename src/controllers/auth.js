import express from 'express';
import models from '../models';
import bcrypt from 'bcrypt';

class AuthController {
    constructor() {
        this.router = express.Router();
        this.router.post('/register', this.register)
    }

    async register(req, res) {
        const {login, password, userName, gender, isSuperUser} = req.body;
        const getPasswordHash = async () => new Promise((resolve, reject) =>
            bcrypt.hash(password, Number(process.env.SALT_ROUNDS),
                (err, hash) => {
                    if (err) reject(err);
                    else resolve(hash);
                }));
        const user = await models.User.create({login, password: await getPasswordHash(), userName, gender, isSuperUser}
        );
        res.send('Success')
    }
}

export default AuthController