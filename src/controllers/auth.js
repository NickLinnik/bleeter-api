import express from 'express';
import models from '../models';
const {User} = models;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController {
    constructor() {
        this.router = express.Router();
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }

    async register(req, res) {
        const {login, userName, gender, isSuperUser} = req.body;
        const hashPassword = await User.getPasswrodHash(req.body.password);
        const user = await User.create(
            {login, password: hashPassword, userName, gender, isSuperUser}
        );
        const {password, ...userWithoutPassword} = user
        res.send({login, userName, gender, isSuperUser});
    }

    async login(req, res) {
        const invalid = 'Invalid login or password';

        const {login, password} = req.body;
        const user = await User.findOne({where: {login}});
        if (!user) {
            res.status(422).send({
                Message: invalid
            });
        }
        const correctPassword = await new Promise((resolve, reject) => bcrypt.compare(password, user.password,
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }));

        if (!correctPassword) {
            res.status(422).send({
                Message: invalid
            });
        }

        const token = await new Promise((resolve, reject) => jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {}, (err, result) => {
            if (err) return reject(err);
            else return resolve(result);
        }));

        res.send(token);
    }
}

export default AuthController;