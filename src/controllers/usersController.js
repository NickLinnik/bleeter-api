import express from 'express';
import {User, Post, Comment, Likeable, Like} from '../models';

class UsersController {
  constructor() {
    this.router = express.Router();
    this.router.post('/update/account', this.updateSelf);
    this.router.post('/update/:id', this.updateUser);
    this.router.post('/delete/account', this.deleteSelf);
    this.router.post('/delete/:id', this.deleteUser);
    this.router.get('/search', this.searchUsers);
    this.router.get('/:id', this.getUser);
  }
  
  async searchUsers(req, res) {
    console.log(req.query);
    const users = await User.findAll({
      where: req.query,
      attributes: {
        exclude: ['password']
      }
    });
    return res.send(users);
  }
  
  async getUser(req, res) {
    const user = await User.findOne({
      where: {id: req.params.id},
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Post, include: {
            model: Likeable, include: Like
          }
        },
        {
          model: Comment, include: {
            model: Likeable, include: Like
          }
        }
      ]
    });
    return res.send(user);
  }
  
  async updateSelf(req, res) {
    const user = req.user;
    const allowedFields = ['login', 'password', 'userName', 'gender'];
    const data = req.body.data;
    return await user.updateFields(data, allowedFields)
      .then(() => res.send(user),
        (reason) => res.status(422).send({message: reason}));
  }
  
  async updateUser(req, res) {
    if (!req.user.admin) {
      return res.status(401).send({
        message: 'Access denied. Only admin users can update other users.'
      });
    }
    
    const user = await User.findOne({where: {id: req.params.id}});
    const data = req.body.data;
    const allowedFields = ['login', 'password', 'userName', 'gender', 'admin'];
    return await user.updateFields(data, allowedFields)
      .then(() => res.send(user),
        (reason) => res.status(422).send({message: reason}));
  }
  
  async deleteSelf(req, res) {
    await req.user.destroy();
    return res.send();
  }
  
  async deleteUser(req, res) {
    if (!req.user.admin) {
      return res.status(401).send({
        message: 'Access denied. Only admin users can delete other users.'
      });
    }
    const user = await User.findOne({where: {id: req.params.id}});
    await user.destroy();
    return res.send();
  }
}

export default UsersController;
