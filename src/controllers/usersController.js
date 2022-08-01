import express from 'express';

import {validateBase} from '../ajvSchemas/userSchemas';
import {User} from '../models';

class UsersController {
  constructor() {
    this.router = express.Router();
    this.router.post('/update/account', this.updateMe);
    this.router.post('/delete/account', this.deleteMe);
    this.router.get('/search', this.searchUsers);
    this.router.get('/:id', this.getUser);
  }
  
  async searchUsers(req, res) {
    const users = await User.findAll({
      where: req.query,
      attributes: {
        exclude: ['password']
      }
    });
    return res.send({users});
  }
  
  async getUser(req, res) {
    const user = await User.findUserFullInfo(req.params.id);
    return res.send({user});
  }
  
  async updateMe(req, res) {
    if (!validateBase(req.body.data)) {
      return res.status(422).send({message: validateBase.errors});
    }
    const user = await req.user.updateFields(req.body.data);
    return res.send({user});
  }
  
  async deleteMe(req, res) {
    await req.user.destroy();
    return res.send();
  }
}

export default UsersController;
