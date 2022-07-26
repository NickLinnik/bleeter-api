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
    let admin = false;
    if (req.body.data.admin) {
      if (req.user.admin) {
        admin = req.body.admin;
      } else {
        return res.status(401).send({message: 'Access denied. Only admin users can register other admin users.'});
      }
    }
    
    const {login, userName, gender} = req.body.data;
    const hashPassword = await User.hashPassword(req.body.data.password);
    const user = await User.create(
      {login, password: hashPassword, userName, gender, admin}
    );
    const {password, ...userWithoutPassword} = user.dataValues;
    return res.send(userWithoutPassword);
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
      id: user.id
    }, process.env.JWT_SECRET, {});
    
    return res.send({token});
  }
  
  async authorize(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ').pop();
      const verify = promisify(jwt.verify);
      const {id} = await verify(token, process.env.JWT_SECRET, {});
      req.user = await User.findOne({where: {id}});
      return next();
    } catch (error) {
      return res.status(401).send({message: 'Access denied. Log in in order to proceed.'});
    }
  }
}

export default AuthController;
