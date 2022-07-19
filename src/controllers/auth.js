import express from 'express';
import models from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import util from 'util';

const {User} = models;

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
        const {password, ...userWithoutPassword} = user.dataValues;
        res.send(userWithoutPassword);
    }

    async login(req, res) {
        const sendError = () => res.status(422).send({error: 'Invalid login or password'});

        const {login, password} = req.body;
        const user = await User.findOne({where: {login}});
        if (!user) sendError();

        const compare = util.promisify(bcrypt.compare);
        const correctPassword = await compare(password, user.password);
        if (!correctPassword) sendError();

        const sign = util.promisify(jwt.sign);
        const token = await sign({id: user.id}, process.env.JWT_SECRET, {});

        res.send({token});
    }

    async auth(req, res, next) {
        const token = req.headers.authorization.split(' ').pop();
        const verify = util.promisify(jwt.verify);
        const {id} = await verify(token, process.env.JWT_SECRET, {})
        req.user = await User.findOne({where: {id}})
        next()
    }
}

export default AuthController;