import express from 'express';
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
    console.log(req.params.id);
    const user = await User.findUserFullInfo(req.params.id)
    return res.send({user});
  }
  
  async updateMe(req, res) {
    const user = req.user;
    const allowedFields = ['login', 'password', 'userName', 'gender'];
    const data = req.body.data;
    return await user.updateFields(data, allowedFields)
      .then(() => res.send({user}),
        (reason) => res.status(422).send({message: reason}));
  }
  
  async deleteMe(req, res) {
    await req.user.destroy();
    return res.send();
  }
}

export default UsersController;
