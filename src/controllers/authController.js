import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {promisify} from 'util';

import {validateForCreate} from '../ajvSchemas/userSchemas';

class AuthController {
  static authorizeSuperUser;
  
  constructor({User}) {
    this.User = User;
    this.router = express.Router();
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }
  
  register = async (req, res) => {
    if (!validateForCreate(req.body.data)) {
      return res.status(422).send({message: validateForCreate.errors});
    }
    const user = await this.User.register(req.body.data);
    return res.send({user});
  };
  
  login = async (req, res) => {
    const sendError = () => res.status(422).send({message: 'Invalid login or password.'});
    
    const {login, password} = req.body.data;
    const user = await this.User.findOne({where: {login}});
    if (!user) return sendError();
    
    const compare = promisify(bcrypt.compare);
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) return sendError();
    
    const sign = promisify(jwt.sign);
    const token = await sign({
      login: user.login
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP});
    
    return res.send({token});
  };
  
  authorizeUser = async (req, res, next) => {
    const sendError = () => res.status(401).send({message: 'Access denied. Log in in order to proceed.'});
    if (!req.headers.authorization) return sendError();
    
    const token = req.headers.authorization.split(' ').pop();
    const verify = promisify(jwt.verify);
    const {login} = await verify(token, process.env.JWT_SECRET, {});
    req.user = await this.User.findOne({where: {login}});
    if (!req.user) return sendError();
    return next();
  };
  
  // must be used after authorizeUser
  authorizeAdmin = async (req, res, next) => {
    if (!req.user.admin) {
      return res.status(401).send({message: 'Access denied. Log in as admin in order to proceed.'});
    }
    return next();
  };
}

export default AuthController;
