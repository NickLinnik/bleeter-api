import {User, Post, Comment, Likeable, Like} from '../../models';

async function findTestUsersData() {
  const include = [
    {
      model: Post, include: {
        model: Likeable,
      }
    },
    {
      model: Comment, include: [
        {model: Likeable, include: Like},
        {
          model: Comment, include: [
            {model: Likeable, include: Like},
            {model: Comment}
          ]
        }
      ]
    }
  ];
  return {
    Chokidar: await User.findOne({where: {login: 'Chokidar'}, include}),
    Albertu: await User.findOne({where: {login: 'Albertu'}, include}),
    Gertrude: await User.findOne({where: {login: 'Gertrude'}, include}),
    Poncha: await User.findOne({where: {login: 'Poncha'}, include})
  };
}

export default findTestUsersData;
