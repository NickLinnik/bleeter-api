import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {promisify} from 'util';
import {User} from '../models';

class AuthController {
  static authorizeSuperUser;
  
  constructor() {
    this.router = express.Router();
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }
  
  async register(req, res) {
    const allowedFields = ['login', 'password', 'userName', 'gender'];
    return await User.register(req.body.data, allowedFields).then(
      (user) => res.send({user}),
      (reason) => res.status(422).send({message: reason}));
  }
  
  async login(req, res) {
    const sendError = () => res.status(422).send({message: 'Invalid login or password.'});
    
    const {login, password} = req.body.data;
    const user = await User.findOne({where: {login}});
    if (!user) return sendError();
    
    const compare = promisify(bcrypt.compare);
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) return sendError();
    
    const sign = promisify(jwt.sign);
    const token = await sign({
      login: user.login
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP});
    
    return res.send({token});
  }
  
  async authorizeUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ').pop();
      const verify = promisify(jwt.verify);
      const {login} = await verify(token, process.env.JWT_SECRET, {});
      req.user = await User.findOne({where: {login}});
      return next();
    } catch (err) {
      return res.status(401).send({message: 'Access denied. Log in in order to proceed.'});
    }
  }
  
  // must be used after authorizeUser
  async authorizeAdmin(req, res, next) {
    if (!req.user.admin) {
      return res.status(401).send({message: 'Access denied. Log in as admin in order to proceed.'});
    }
    return next();
  }
}

export default AuthController;
