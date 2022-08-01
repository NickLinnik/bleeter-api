import express from 'express';

import {validateBase} from '../ajvSchemas/userSchemas';

class UsersController {
  constructor({User}) {
    this.User = User;
    this.router = express.Router();
    this.router.post('/update/account', this.updateMe);
    this.router.post('/delete/account', this.deleteMe);
    this.router.get('/search', this.searchUsers);
    this.router.get('/:id', this.getUser);
  }
  
  searchUsers = async (req, res) => {
    const users = await this.User.findAll({
      where: req.query,
      attributes: {
        exclude: ['password']
      }
    });
    return res.send({users});
  };
  
  getUser = async (req, res) => {
    const user = await this.User.findUserFullInfo(req.params.id);
    return res.send({user});
  };
  
  updateMe = async (req, res) => {
    if (!validateBase(req.body.data)) {
      return res.status(422).send({message: validateBase.errors});
    }
    const user = await req.user.updateFields(req.body.data);
    return res.send({user});
  };
  
  async deleteMe(req, res) {
    await req.user.destroy();
    return res.send();
  }
}

export default UsersController;
